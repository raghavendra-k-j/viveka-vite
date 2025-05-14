import React from 'react';

interface QuestionTypeBadgeProps {
    type: string;
}

interface BadgeProps {
    text: string;
    bgColor: string;
    textColor: string;
}

const Badge: React.FC<BadgeProps> = ({ text, bgColor, textColor }) => {
    return (
        <span
            className={`inline-block text-truncate px-3 py-1 text-xs font-semibold rounded-sm ${bgColor} ${textColor}`}
        >
            {text}
        </span>
    );
};

export const QuestionTypeBadge: React.FC<QuestionTypeBadgeProps> = ({ type }) => {
    return <Badge text={type} bgColor="bg-blue-50" textColor="text-blue-500" />;
};

interface MarksBadgeProps {
    text: string;
}

export const MarksBadge: React.FC<MarksBadgeProps> = ({ text }) => {
    return <Badge text={text} bgColor="bg-emerald-50" textColor="text-emerald-700" />;
}

interface LevelBadgeProps {
    text: string;
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({ text }) => {
    return <Badge text={text} bgColor="bg-indigo-50" textColor="text-indigo-500" />;
}

