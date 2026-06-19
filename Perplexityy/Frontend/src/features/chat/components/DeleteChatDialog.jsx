import React from 'react'
import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"

const DeleteChatDialog = ({
   isOpen,
   onOpenChange,
   onConfirm,
}) => {
   return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
         <DialogContent className="bg-white/5 backdrop-blur-xl border-[#424845] shadow-[0_0_40px_rgba(186,246,0,0.08)]">
            <DialogHeader>
               <DialogTitle className="text-white text-xl">Delete Chat</DialogTitle>
               <DialogDescription className="text-gray-400">
                  Are you sure you want to delete this chat? This action cannot be undone.
               </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-3">
               <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="border-[#424845] text-gray-300 hover:bg-white/5"
               >
                  Cancel
               </Button>
               <Button
                  onClick={onConfirm}
                  className="bg-red-600 hover:bg-red-700 text-white"
               >
                  Delete
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}

export default DeleteChatDialog
