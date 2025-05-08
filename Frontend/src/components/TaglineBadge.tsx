import React from 'react';

interface TaglineBadgeProps {
  text: string;
}

const TaglineBadge: React.FC<TaglineBadgeProps> = ({ text }) => {
  return (
    <div className="inline-flex w-fit items-center px-4 py-2 rounded-full bg-[#0A3830] text-[#9CACA9] text-sm font-medium">
      ✨ {text}
    </div>
  );
};

export default TaglineBadge;
