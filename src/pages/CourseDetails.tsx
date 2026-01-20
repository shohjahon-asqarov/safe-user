import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getCourseById, getModulesByCourseId, getLessonsByCourseId } from "@/data/courses";
import { 
  Clock, 
  BookOpen, 
  ChevronRight, 
  PlayCircle, 
  CheckCircle2, 
  ArrowLeft,
  Award
} from "lucide-react";

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

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const course = getCourseById(courseId || "");
  const modules = getModulesByCourseId(courseId || "");
  const lessons = getLessonsByCourseId(courseId || "");
  
  // Track completed lessons (frontend state only)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  if (!course) {
    return (
      <Layout>
        <div className="section-container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The course you're looking for doesn't exist.
          </p>
          <Link to="/courses">
            <Button>Browse Courses</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const progress = lessons.length > 0 
    ? (completedLessons.size / lessons.length) * 100 
    : 0;

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId);
      } else {
        newSet.add(lessonId);
      }
      return newSet;
    });
  };

  const getLessonsForModule = (moduleId: string) => {
    return lessons.filter(lesson => lesson.moduleId === moduleId);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 lg:py-16">
        <div className="section-container">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className={levelColors[course.level]}>
                  {levelLabels[course.level]}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {course.modules} modules • {course.lessons} lessons
                </span>
              </div>
            </div>

            {/* Progress Card */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Your Progress</h3>
                <ProgressBar value={progress} showLabel size="lg" className="mb-6" />
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  {completedLessons.size} of {lessons.length} lessons completed
                </div>

                {lessons[0] && (
                  <Link to={`/courses/${course.id}/lesson/${lessons[0].id}`}>
                    <Button className="w-full gap-2">
                      {completedLessons.size > 0 ? "Continue Learning" : "Start Course"}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                )}

                {progress === 100 && (
                  <Link to="/certificate" className="block mt-3">
                    <Button variant="outline" className="w-full gap-2">
                      <Award className="w-4 h-4" />
                      Get Certificate
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-8 border-b border-border bg-card/50">
        <div className="section-container">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground mr-2">Topics:</span>
            {course.topics.map((topic) => (
              <Badge key={topic} variant="secondary">
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12 lg:py-16">
        <div className="section-container">
          <h2 className="text-2xl font-bold mb-8">Course Content</h2>

          <div className="space-y-6">
            {modules.map((module, moduleIndex) => {
              const moduleLessons = getLessonsForModule(module.id);
              const completedInModule = moduleLessons.filter(l => completedLessons.has(l.id)).length;

              return (
                <Card 
                  key={module.id} 
                  className="overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${moduleIndex * 0.1}s` }}
                >
                  <div className="p-6 bg-secondary/30 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Module {module.order}
                        </div>
                        <h3 className="text-lg font-semibold">{module.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {module.description}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {completedInModule}/{moduleLessons.length} completed
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-border">
                    {moduleLessons.map((lesson) => {
                      const isCompleted = completedLessons.has(lesson.id);
                      
                      return (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => toggleLessonComplete(lesson.id)}
                              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                                isCompleted
                                  ? "bg-success border-success text-success-foreground"
                                  : "border-muted-foreground/30 hover:border-primary"
                              }`}
                            >
                              {isCompleted && <CheckCircle2 className="w-5 h-5" />}
                            </button>
                            <div>
                              <Link
                                to={`/courses/${course.id}/lesson/${lesson.id}`}
                                className="font-medium hover:text-primary transition-colors"
                              >
                                {lesson.title}
                              </Link>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <PlayCircle className="w-3 h-3" />
                                  Video
                                </span>
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                          </div>

                          <Link to={`/courses/${course.id}/lesson/${lesson.id}`}>
                            <Button variant="ghost" size="sm" className="gap-1">
                              {isCompleted ? "Review" : "Start"}
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              );
            })}

            {modules.length === 0 && (
              <Card className="p-8 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Course content coming soon</h3>
                <p className="text-muted-foreground">
                  We're currently developing the lessons for this course.
                </p>
              </Card>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CourseDetails;
