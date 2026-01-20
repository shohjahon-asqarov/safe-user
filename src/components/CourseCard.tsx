import { Link } from "react-router-dom";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { Course } from "@/data/courses";

interface CourseCardProps {
  course: Course;
}

const levelColors = {
  beginner: "badge-beginner",
  intermediate: "badge-intermediate",
  advanced: "badge-advanced",
};

const levelLabels = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link to={`/courses/${course.id}`}>
      <Card className="h-full card-hover group overflow-hidden border-border/50 bg-card">
        {/* Image placeholder with gradient overlay */}
        <div className="relative h-40 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="absolute top-3 left-3">
            <Badge variant="outline" className={`${levelColors[course.level]} text-xs`}>
              {levelLabels[course.level]}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-2">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
        </CardHeader>

        <CardContent className="pb-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>
        </CardContent>

        <CardFooter className="pt-0 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
            <span>{course.lessons} lessons</span>
          </div>
          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
        </CardFooter>
      </Card>
    </Link>
  );
};
