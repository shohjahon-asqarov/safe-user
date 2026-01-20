import { Lightbulb } from "lucide-react";

interface SecurityTipProps {
  tips: string[];
}

export const SecurityTip = ({ tips }: SecurityTipProps) => {
  return (
    <div className="bg-accent/10 border border-accent/20 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Lightbulb className="h-4 w-4" />
        </div>
        <h3 className="font-semibold text-accent">Security Tips</h3>
      </div>
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-3 text-sm">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center font-medium">
              {index + 1}
            </span>
            <span className="text-foreground/80">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
