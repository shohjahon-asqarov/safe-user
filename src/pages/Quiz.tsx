import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { quizzes, Quiz as QuizType, QuizQuestion } from "@/data/quizzes";
import { Link } from "react-router-dom";
import { 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle, 
  Trophy,
  RefreshCw,
  Award,
  AlertCircle
} from "lucide-react";

type QuizState = 'intro' | 'in-progress' | 'result';

const Quiz = () => {
  const quiz = quizzes[0]; // Using the first quiz for this MVP
  const [state, setState] = useState<QuizState>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quiz.questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60); // Convert to seconds

  // Timer (fake - just counts down for UI)
  useEffect(() => {
    if (state !== 'in-progress') return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setState('result');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const selectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const goToNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const submitQuiz = () => {
    setState('result');
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: quiz.questions.length,
      percentage: Math.round((correct / quiz.questions.length) * 100),
    };
  };

  const resetQuiz = () => {
    setState('intro');
    setCurrentQuestion(0);
    setAnswers(new Array(quiz.questions.length).fill(null));
    setTimeLeft(quiz.timeLimit * 60);
  };

  const score = calculateScore();
  const passed = score.percentage >= quiz.passingScore;
  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <Layout>
      {/* Intro State */}
      {state === 'intro' && (
        <section className="py-20 lg:py-28">
          <div className="section-container max-w-2xl">
            <div className="text-center animate-fade-in">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{quiz.title}</h1>
              <p className="text-lg text-muted-foreground mb-8">
                {quiz.description}
              </p>

              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{quiz.questions.length}</div>
                      <div className="text-sm text-muted-foreground">Questions</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{quiz.timeLimit}</div>
                      <div className="text-sm text-muted-foreground">Minutes</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{quiz.passingScore}%</div>
                      <div className="text-sm text-muted-foreground">To Pass</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button size="lg" onClick={() => setState('in-progress')} className="gap-2">
                Start Quiz
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* In Progress State */}
      {state === 'in-progress' && (
        <section className="py-12 lg:py-16">
          <div className="section-container max-w-3xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 animate-fade-in">
              <div>
                <h1 className="text-xl font-bold">{quiz.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </p>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                timeLeft < 60 ? 'bg-destructive/10 text-destructive' : 'bg-secondary'
              }`}>
                <Clock className="w-4 h-4" />
                <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Progress */}
            <ProgressBar value={progress} className="mb-8" />

            {/* Question Card */}
            <Card className="mb-8 animate-fade-in">
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl font-semibold mb-6">{currentQ.question}</h2>

                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => selectAnswer(index)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        answers[currentQuestion] === index
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                          answers[currentQuestion] === index
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-muted-foreground/30'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-1">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={goToPrev}
                disabled={currentQuestion === 0}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentQuestion === quiz.questions.length - 1 ? (
                <Button onClick={submitQuiz} className="gap-2">
                  Submit Quiz
                  <CheckCircle2 className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={goToNext} className="gap-2">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Question indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentQuestion
                      ? 'bg-primary w-8'
                      : answers[index] !== null
                      ? 'bg-primary/50'
                      : 'bg-secondary'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Result State */}
      {state === 'result' && (
        <section className="py-20 lg:py-28">
          <div className="section-container max-w-2xl">
            <div className="text-center animate-fade-in">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                passed ? 'bg-success/10' : 'bg-destructive/10'
              }`}>
                {passed ? (
                  <Trophy className="w-12 h-12 text-success" />
                ) : (
                  <AlertCircle className="w-12 h-12 text-destructive" />
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {passed ? 'Congratulations!' : 'Keep Learning!'}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {passed
                  ? "You've passed the security quiz!"
                  : "Don't worry, you can try again!"}
              </p>

              <Card className="mb-8">
                <CardContent className="p-8">
                  <div className="text-5xl font-bold mb-2" style={{ color: passed ? 'hsl(var(--success))' : 'hsl(var(--destructive))' }}>
                    {score.percentage}%
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {score.correct} out of {score.total} correct
                  </p>

                  <div className="flex justify-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>{score.correct} Correct</span>
                    </div>
                    <div className="flex items-center gap-2 text-destructive">
                      <XCircle className="w-5 h-5" />
                      <span>{score.total - score.correct} Wrong</span>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Passing score: {quiz.passingScore}%
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={resetQuiz} className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>
                {passed && (
                  <Link to="/certificate">
                    <Button className="gap-2">
                      <Award className="w-4 h-4" />
                      Get Certificate
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Answer Review */}
            <div className="mt-16">
              <h2 className="text-xl font-bold mb-6">Answer Review</h2>
              <div className="space-y-4">
                {quiz.questions.map((q, index) => {
                  const isCorrect = answers[index] === q.correctAnswer;
                  return (
                    <Card key={q.id} className={`border-l-4 ${isCorrect ? 'border-l-success' : 'border-l-destructive'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium mb-2">{q.question}</p>
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium">Your answer:</span>{" "}
                              {answers[index] !== null ? q.options[answers[index]] : "Not answered"}
                            </p>
                            {!isCorrect && (
                              <p className="text-sm text-success mt-1">
                                <span className="font-medium">Correct answer:</span>{" "}
                                {q.options[q.correctAnswer]}
                              </p>
                            )}
                            <p className="text-sm text-muted-foreground mt-2 p-3 bg-secondary/50 rounded-lg">
                              {q.explanation}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Quiz;
