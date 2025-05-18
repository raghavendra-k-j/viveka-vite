export async function withMinDelay<T>(promise: Promise<T>, minDelayMs = 300): Promise<T> {
    const start = Date.now();

    const result = await promise;

    const elapsed = Date.now() - start;
    const remaining = minDelayMs - elapsed;

    if (remaining > 0) {
        await new Promise(resolve => setTimeout(resolve, remaining));
    }

    return result;
}
