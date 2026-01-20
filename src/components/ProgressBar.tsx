import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar = ({ 
  value, 
  max = 100, 
  className,
  showLabel = false,
  size = 'md'
}: ProgressBarProps) => {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-medium">{percentage}%</span>
        </div>
      )}
      <div className={cn(
        "w-full bg-secondary rounded-full overflow-hidden",
        sizeClasses[size]
      )}>
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
