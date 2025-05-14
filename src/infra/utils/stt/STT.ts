/**
 * Enumeration of specific error codes related to speech-to-text (STT) functionality.
 */
export enum STTErrorCode {
    /** Indicates that speech recognition is not supported on the current platform or browser. */
    SPEECH_NOT_SUPPORTED = "SPEECH_NOT_SUPPORTED",

    /** A generic or unknown error occurred during speech recognition. */
    GENERAL_ERROR = "GENERAL_ERROR",

    /** An attempt was made to start speech recognition while it was already running. */
    ALREADY_STARTED = "ALREADY_STARTED",

    /** An attempt to access the speech recognition instance was made before it was initialized. */
    INSTANCE_NOT_INITIALIZED = "INSTANCE_NOT_INITIALIZED",

    /** The user denied permission to access the microphone. */
    MIC_PERMISSION_DENIED = "MIC_PERMISSION_DENIED",
}


/**
 * Custom error class for handling Speech-to-Text (STT) related errors.
 * Extends the built-in `Error` class and adds an `STTErrorCode` to categorize the error.
 */
export class STTError extends Error {

    /** A specific error code from the STTErrorCode enum indicating the type of error. */
    code: STTErrorCode;

    /**
     * Constructs a new STTError instance.
     *
     * @param code - The specific STT error code.
     * @param message - A human-readable error message describing the issue.
     */
    constructor(code: STTErrorCode, message: string) {
        super(message);
        this.code = code;
        this.name = "STTError";

        // Set the prototype explicitly for compatibility with older environments.
        Object.setPrototypeOf(this, STTError.prototype);
    }

    /**
     * A factory method for creating a generic STTError with the `GENERAL_ERROR` code.
     *
     * @param message - A human-readable message for the general error.
     * @returns A new STTError instance with the `GENERAL_ERROR` code.
     */
    static general(message: string): STTError {
        return new STTError(STTErrorCode.GENERAL_ERROR, message);
    }
}


/**
 * Configuration options for starting speech recognition using the STT class.
 */
export interface STTStartOptions {
    /**
     * The BCP 47 language tag indicating the language to be recognized.
     * 
     * Examples: `'en-US'` for American English, `'fr-FR'` for French.
     */
    lang: string;

    /**
     * Whether continuous recognition is enabled.
     * 
     * - `true`: Speech recognition continues until manually stopped.
     * - `false`: Speech recognition stops automatically after detecting a pause.
     */
    continuous: boolean;

    /**
     * Whether interim (partial) results should be returned while the user is still speaking.
     * 
     * - `true`: Partial transcripts are provided before the final result.
     * - `false`: Only final transcripts are returned.
     */
    interimResults: boolean;
}




/**
 * The STT (Speech-To-Text) class provides a wrapper around the Web Speech API's `SpeechRecognition`
 * to handle voice input, transcription, and event management in a type-safe and modular way.
 */
export class STT {


    /** The underlying SpeechRecognition instance from the Web Speech API. */
    private recognition?: SpeechRecognition;

    /** Flag indicating whether speech recognition is currently active. */
    private recognizing = false;

    /** Accumulates the final recognized transcript. */
    private finalTranscript = "";

    /**
     * Event listeners for when speech recognition starts.
     * Each listener is a function with no parameters and no return value.
     */
    private readonly startListeners = new Set<() => void>();

    /**
     * Event listeners for when speech recognition ends.
     * Each listener is a function with no parameters and no return value.
     */
    private readonly endListeners = new Set<() => void>();

    /**
     * Event listeners for finalized speech recognition results.
     * Each listener receives the final transcript text.
     */
    private readonly resultListeners = new Set<(text: string) => void>();

    /**
     * Event listeners for interim (partial) speech recognition results.
     * Each listener receives the partial transcript text.
     */
    private readonly partialResultListeners = new Set<(text: string) => void>();

    /**
     * Event listeners for errors during speech recognition.
     * Each listener receives an `STTError` object.
     */
    private readonly errorListeners = new Set<(err: STTError, errorEvent?: SpeechRecognitionErrorEvent) => void>();

    /** Optional identifier for this instance of the STT class, useful in multi-instance contexts. */
    public instanceId: string;



    /**
     * Constructs a new instance of the STT class.
     * Initializes and binds to the `SpeechRecognition` implementation if available in the browser.
     *
     * @param instanceId - Optional string identifier for the instance (default: `"default"`).
     */
    constructor({ instanceId = "default" }: { instanceId?: string } = {}) {
        this.instanceId = instanceId;

        // Server-side guard to prevent usage in non-browser environments (e.g. Node.js)
        if (typeof window === "undefined") return;

        // Attempt to use either standard or prefixed version of SpeechRecognition
        const Impl = window.SpeechRecognition || window.webkitSpeechRecognition;

        // Exit early if SpeechRecognition is not supported in this environment
        if (!Impl) return;

        // Initialize the recognition instance and bind necessary event handlers
        this.recognition = new Impl();
        this.bindEvents();
    }





    /**
 * Registers a callback to be invoked when speech recognition starts.
 * 
 * @param handler - A function called with no arguments when recognition begins.
 */
    public onStart(handler: () => void) {
        this.finalTranscript = "";
        this.startListeners.add(handler);
    }

    /**
     * Registers a callback to be invoked when speech recognition ends.
     * 
     * @param handler - A function called with no arguments when recognition stops.
     */
    public onEnd(handler: () => void) {
        this.endListeners.add(handler);
    }

    /**
     * Registers a callback to be invoked when final speech recognition results are available.
     * 
     * @param handler - A function called with the final recognized transcript as a string.
     */
    public onResult(handler: (text: string) => void) {
        this.resultListeners.add(handler);
    }

    /**
     * Registers a callback to be invoked with interim (partial) recognition results.
     * 
     * @param handler - A function called with the partial transcript as a string.
     */
    public onPartialResult(handler: (text: string) => void) {
        this.partialResultListeners.add(handler);
    }

    /**
     * Registers a callback to be invoked when an error occurs during recognition.
     * 
     * @param handler - A function called with an `STTError` object and an optional error event.
     */
    public onError(handler: (error: STTError, errorEvent?: SpeechRecognitionErrorEvent) => void) {
        this.errorListeners.add(handler);
    }


    /**
 * Removes a previously registered `onStart` event handler.
 * 
 * @param handler - The callback function to remove.
 */
    public offStart(handler: () => void) {
        this.startListeners.delete(handler);
    }

    /**
     * Removes a previously registered `onEnd` event handler.
     * 
     * @param handler - The callback function to remove.
     */
    public offEnd(handler: () => void) {
        this.endListeners.delete(handler);
    }

    /**
     * Removes a previously registered `onResult` event handler.
     * 
     * @param handler - The callback function to remove.
     */
    public offResult(handler: (text: string) => void) {
        this.resultListeners.delete(handler);
    }

    /**
     * Removes a previously registered `onPartialResult` event handler.
     * 
     * @param handler - The callback function to remove.
     */
    public offPartialResult(handler: (text: string) => void) {
        this.partialResultListeners.delete(handler);
    }

    /**
     * Removes a previously registered `onError` event handler.
     * 
     * @param handler - The callback function to remove.
     */
    public offError(handler: (error: STTError) => void) {
        this.errorListeners.delete(handler);
    }

    /**
     * Removes all registered event listeners for a specific event type, or for all event types if none is specified.
     *
     * @param event - (Optional) The specific event type to clear listeners for. 
     * If omitted, listeners for **all** event types (`"start"`, `"end"`, `"result"`, `"partialResult"`, `"error"`) will be removed.
     *
     * ### Example usage:
     * ```ts
     * stt.removeAllListeners("result"); // Removes all result listeners only
     * stt.removeAllListeners();         // Removes all listeners for all event types
     * ```
     */
    public removeAllListeners(event?: "start" | "end" | "result" | "partialResult" | "error"): void {
        switch (event) {
            case "start":
                this.startListeners.clear();
                break;
            case "end":
                this.endListeners.clear();
                break;
            case "result":
                this.resultListeners.clear();
                break;
            case "partialResult":
                this.partialResultListeners.clear();
                break;
            case "error":
                this.errorListeners.clear();
                break;
            default:
                // Clear all listeners if no specific event is provided
                this.startListeners.clear();
                this.endListeners.clear();
                this.resultListeners.clear();
                this.partialResultListeners.clear();
                this.errorListeners.clear();
        }
    }



    /**
     * Binds internal handlers to the `SpeechRecognition` instance events.
     * Handles start, end, error, and result events and dispatches them
     * to corresponding internal listeners.
     *
     */
    private bindEvents(): void {
        if (!this.recognition) {
            throw new STTError(STTErrorCode.INSTANCE_NOT_INITIALIZED, "SpeechRecognition instance is not initialized.");
        }
        const r = this.recognition;

        /**
         * Triggered when speech recognition begins successfully.
         * Updates internal state and emits to all `onStart` listeners.
         */
        r.onstart = () => {
            this.recognizing = true;
            this.emitStart();
        };

        /**
         * Triggered when speech recognition ends (manually or automatically).
         * Updates internal state and emits to all `onEnd` listeners.
         */
        r.onend = () => {
            this.recognizing = false;
            this.emitEnd();
        };

        /**
         * Triggered when an error occurs in the speech recognition engine.
         * Maps browser error codes to internal `STTErrorCode` values
         * and emits a structured `STTError` to all `onError` listeners.
         */
        r.onerror = (event) => {
            this.emitError(new STTError(STTErrorCode.GENERAL_ERROR, event.message), event);
        };


        /**
         * Triggered when speech recognition captures a result (interim or final).
         * Final results are accumulated and emitted via `onResult`,
         * while interim results are emitted via `onPartialResult`.
         */
        r.onresult = (event: SpeechRecognitionEvent) => {
            let interim = "";

            // Iterate through all results starting from the current result index
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    this.finalTranscript += transcript;
                    this.emitResult(this.finalTranscript.trim());
                } else {
                    interim += transcript;
                }
            }

            if (interim) {
                this.emitPartialResult(interim.trim());
            }
        };
    }



    /**
     * Emits the `start` event to all registered listeners.
     * Called when speech recognition starts.
     */
    private emitStart(): void {
        this.startListeners.forEach(fn => fn());
    }

    /**
     * Emits the `end` event to all registered listeners.
     * Called when speech recognition ends.
     */
    private emitEnd(): void {
        this.endListeners.forEach(fn => fn());
    }

    /**
     * Emits the `result` event to all registered listeners with the final transcript.
     *
     * @param text - The finalized speech recognition result as a string.
     */
    private emitResult(text: string): void {
        this.resultListeners.forEach(fn => fn(text));
    }

    /**
     * Emits the `partialResult` event to all registered listeners with an interim transcript.
     *
     * @param text - The interim (non-final) transcript as a string.
     */
    private emitPartialResult(text: string): void {
        this.partialResultListeners.forEach(fn => fn(text));
    }

    /**
     * Emits the `error` event to all registered listeners with an `STTError` object.
     *
     * @param err - The structured STTError representing the error.
     * @param errorEvent - (Optional) The original `SpeechRecognitionErrorEvent` from the browser, if available.
     */
    private emitError(err: STTError, errorEvent?: SpeechRecognitionErrorEvent): void {
        this.errorListeners.forEach(fn => fn(err, errorEvent));
    }


    /**
     * Begins speech recognition, prompting the user for microphone permission if necessary.
     * 
     * This method performs several steps to ensure that speech recognition is ready to start:
     * 1. Checks if the recognition instance is properly initialized.
     * 2. Checks if microphone permission has been granted.
     * 3. Sets configuration options for the recognition process (language, continuous mode, interim results).
     * 4. Attempts to start the recognition service and handles any errors that occur during the startup process.
     * 
     * @param options - Optional configuration for speech recognition.
     * - `lang`: The language code for recognition (default: `"en-US"`).
     * - `continuous`: Whether the recognition should continue until stopped (default: `true`).
     * - `interimResults`: Whether to return interim (partial) results as speech is detected (default: `true`).
     * 
     * @throws {STTError} - Throws an error if the recognition instance is not initialized or microphone permission is denied.
     */
    public async start(options: Partial<STTStartOptions> = {}): Promise<void> {
        await this.ensureReadyToStart(); // Ensure the recognition is ready to start

        // Destructure options with defaults
        const { lang = "en-US", continuous = true, interimResults = true } = options;

        // Apply the configuration settings to the recognition instance
        this.recognition!.lang = lang;
        this.recognition!.continuous = continuous;
        this.recognition!.interimResults = interimResults;

        // Clear the final transcript (start fresh)
        this.finalTranscript = "";

        try {
            // Attempt to start speech recognition
            this.recognition!.start();
        }
        catch (err) {
            // Handle any error that occurs when starting speech recognition
            const error = new STTError(STTErrorCode.GENERAL_ERROR, "Error starting speech recognition");
            error.stack = err instanceof Error ? err.stack : undefined;
            this.emitError(error);  // Emit the error event
            throw error;  // Rethrow the error for handling by the caller
        }
    }

    /**
     * Ensures that the speech recognition instance is ready to start and checks for microphone permissions.
     * 
     * This method performs the following:
     * 1. Verifies that the `SpeechRecognition` instance is properly initialized.
     * 2. If supported by the browser, checks whether the user has granted permission to access the microphone.
     * 
     * @throws {STTError} - Throws an error if the instance is not initialized or if microphone permission is denied.
     */
    private async ensureReadyToStart(): Promise<void> {
        // Check if the recognition instance is initialized
        if (!this.recognition) {
            throw new STTError(STTErrorCode.INSTANCE_NOT_INITIALIZED, "SpeechRecognition instance is not initialized.");
        }

        // If the Permissions API is supported, check microphone permissions
        if (navigator.permissions) {
            try {
                // Query microphone permission status
                const permissionStatus = await navigator.permissions.query({ name: "microphone" as PermissionName });

                // If permission is denied, throw an error
                if (permissionStatus.state === "denied") {
                    throw new STTError(STTErrorCode.MIC_PERMISSION_DENIED, "Microphone permission was denied.");
                }
            }
            catch (error) {
                // Handle any error during permission checking
                const err = new STTError(STTErrorCode.GENERAL_ERROR, "Error checking microphone permission");
                err.stack = error instanceof Error ? error.stack : undefined;
                this.emitError(err);  // Emit the error event
                throw err;  // Rethrow the error
            }
        }
    }


    /**
     * Gracefully stops the speech recognition service after the current utterance is processed.
     * 
     * - Triggers the `onend` event after processing is complete.
     * - Captured audio until this point will still be analyzed and may emit final results.
     * - Recommended when you want to end user input naturally (e.g., after silence).
     *
     * Equivalent to calling `SpeechRecognition.stop()`.
     */
    public stop(): void {
        this.recognition?.stop();
    }

    /**
     * Immediately aborts speech recognition and discards any captured audio not yet processed.
     * 
     * - Triggers the `onend` event without producing any additional results.
     * - Use this to cancel recognition without waiting (e.g., on error or user cancellation).
     *
     * Equivalent to calling `SpeechRecognition.abort()`.
     */
    public abort(): void {
        this.recognition?.abort();
    }

    /**
     * Indicates whether the speech recognition engine is currently running.
     * 
     * - Returns `true` if recognition is active and listening.
     * - Internally tracked based on `onstart` and `onend` events.
     *
     * @returns `boolean` — `true` if speech recognition is in progress, otherwise `false`.
     */
    public isRecognizing(): boolean {
        return this.recognizing;
    }

    /**
     * Terminates the speech recognition service and cleans up all event listeners.
     * 
     * - Aborts any active recognition immediately (`abort()`).
     * - Clears all registered event listeners (start, end, result, error, etc.).
     * - Releases the internal `SpeechRecognition` instance.
     *
     * Should be called when you're done using the STT instance (e.g., on component unmount).
     */
    public dispose(): void {
        this.abort();
        this.removeAllListeners();
        this.recognition = undefined;
    }

}
