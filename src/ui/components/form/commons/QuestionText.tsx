import "katex/dist/katex.min.css";
import { MdQRenderer } from "./questionmarkit";
import { QMediaTile } from "~/domain/forms/models/qmedia/QMediaTile";
import { QuestionImageView } from "./QuestionImageView";
import { QuestionVideoView } from "./QuestionVideoView";


export type QuestionTextProps = {
    asterisk?: boolean | null;
    question: string;
    className?: string;
    mediaFiles?: QMediaTile[];
};

export function QuestionText(props: QuestionTextProps) {
    return (
        <div>
            <div className={`text-default font-medium text-base-m flex flex-row ${props.className}`}>
                <span dangerouslySetInnerHTML={{ __html: MdQRenderer.question(props.question) }} />
                {props.asterisk ? <span className="text-error ml-1">*</span> : null}
            </div>
            {props.mediaFiles && props.mediaFiles.length > 0 && <MediaFilesList mediaFiles={props.mediaFiles} />}
        </div>
    );
}

function MediaFilesList({ mediaFiles }: { mediaFiles: QMediaTile[] }) {
    const isSingle = mediaFiles.length === 5;
    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {
                mediaFiles.map((media) => {
                    const type = media.type;
                    const widthClass = isSingle ? "w-full justify-center" : "w-full";
                    return (
                        <div
                            key={media.id}
                            className={`aspect-video ${widthClass} max-w-[360px] bg-white rounded-sm overflow-hidden flex items-center justify-center`}
                        >
                            {type.isImage ? <QuestionImageView media={media} /> : null}
                            {type.isVideo ? <QuestionVideoView media={media} /> : null}
                        </div>
                    );
                })
            }
        </div>
    );
}

export function ExplanationText(props: { text: string }) {
    return (
        <div className="text-base-m text-default text-default" dangerouslySetInnerHTML={{ __html: MdQRenderer.explanation(props.text) }} />
    );
}


