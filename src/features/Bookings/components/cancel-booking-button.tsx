"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import { deleteBooking } from "@/actions/delete-booking";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CancelBookingButtonProps {
  bookingId: string;
  onSuccess?: () => void;
  className?: string;
}

export function CancelBookingButton({
  bookingId,
  onSuccess,
  className,
}: CancelBookingButtonProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeletingBooking, startDeletingBooking] = useTransition();

  const handleCancelBooking = () => {
    startDeletingBooking(async () => {
      try {
        await deleteBooking({ bookingId });

        setIsDialogOpen(false);
        onSuccess?.();
        toast.success("Reserva cancelada com sucesso!");
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("Erro ao cancelar reserva");
      }
    });
  };

  return (
    <>
      <Button
        variant="destructive"
        className={className}
        onClick={() => setIsDialogOpen(true)}
      >
        Cancelar Reserva
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-82 gap-0 rounded-[14px] border-[#26272B] bg-[#141518] p-0 text-white [&>button]:hidden">
          <DialogHeader className="gap-3 px-6 pt-8 pb-6 text-center">
            <DialogTitle className="text-center text-[28px] font-bold">
              Cancelar Reserva
            </DialogTitle>
            <DialogDescription className="text-center text-lg leading-7 text-[#838896]">
              Tem certeza que deseja cancelar esse agendamento?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex-row gap-3 px-6 pb-6">
            <Button
              type="button"
              variant="secondary"
              className="h-14 flex-1 rounded-xl bg-[#26272B] text-lg font-bold text-white hover:bg-[#2F3035]"
              onClick={() => setIsDialogOpen(false)}
              disabled={isDeletingBooking}
            >
              Voltar
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="h-14 flex-1 rounded-xl text-lg font-bold"
              onClick={handleCancelBooking}
              disabled={isDeletingBooking}
            >
              {isDeletingBooking ? "Cancelando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
