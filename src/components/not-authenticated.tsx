"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarClock } from "lucide-react";
import LoginDialog from "./login-dialog";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const NotAuthenticated = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center p-4">
      <Card className="w-full max-w-md border-none bg-transparent shadow-none">
        <CardContent className="flex flex-col items-center gap-6 p-6 text-center">
          <div className="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full">
            <CalendarClock
              className="text-primary h-10 w-10"
              strokeWidth={1.5}
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Acesso Restrito</h2>
            <p className="text-muted-foreground text-balance">
              Você precisa se logar para ver os seus agendamentos e realizar
              novas reservas.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3">
            <Button
              variant="outline"
              className="w-full font-bold"
              size="lg"
              onClick={handleGoBack}
            >
              <ArrowLeft className="h-5 w-5" />
              Voltar
            </Button>

            <LoginDialog>
              <Button className="w-full font-bold" size="lg">
                Fazer login com Google
              </Button>
            </LoginDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotAuthenticated;
