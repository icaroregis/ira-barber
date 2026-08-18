"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Image from "next/image";

interface LoginDialogProps {
  children: React.ReactNode;
}

const LoginDialog = ({ children }: LoginDialogProps) => {
  const handleLoginWithGoogle = () => {
    // Placeholder for login logic
    console.log("Login with Google clicked");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[312px] rounded-[10px]">
        <DialogHeader>
          <DialogTitle className="text-center font-bold">
            Faça login na plataforma
          </DialogTitle>
          <DialogDescription className="text-center">
            Conecte-se usando sua conta do Google
          </DialogDescription>
        </DialogHeader>

        <Button
          variant="outline"
          className="mt-6 flex w-full gap-2 font-bold"
          onClick={handleLoginWithGoogle}
        >
          <Image
            src="/google.svg"
            width={18}
            height={18}
            alt="Google"
            aria-hidden
          />
          Google
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
