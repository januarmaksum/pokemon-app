import * as React from "react";

interface IconLabelProps {
  icon: React.ReactNode;
  label: string;
  title?: string;
}

export default function IconLabel({ icon, label, title = "" }: IconLabelProps) {
  return (
    <div className="flex flex-col items-center space-x-2 gap-1" title={title}>
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );
}
