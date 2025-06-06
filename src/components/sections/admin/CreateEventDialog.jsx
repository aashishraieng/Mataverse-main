import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export function CreateEventDialog({ 
  isOpen, 
  onOpenChange, 
  formData, 
  onInputChange, 
  onSubmit, 
  isEditMode,
  onClose // Added onClose to handle dialog close actions like resetting form
}) {
  // Use a local handler for onOpenChange to also call onClose when dialog is closed
  const handleOpenChange = (open) => {
    if (!open && onClose) {
      onClose(); // Call the passed onClose handler (which resets form in AdminDashboard)
    }
    onOpenChange(open); // Propagate the open state change
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* DialogTrigger is handled by AdminDashboard, this component is just the content */}
      <DialogContent className="sm:max-w-[525px] bg-gray-800 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Event" : "Create New Event"}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update the details for this event." : "Fill in the details for the new event."} Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 py-4">
          <div>
            <Label htmlFor="eventName" className="text-gray-300">Event Name</Label>
            <Input 
              id="eventName" 
              name="eventName" 
              value={formData.eventName} 
              onChange={onInputChange} 
              className="bg-gray-700 border-gray-600 text-white" 
              required 
            />
          </div>
          <div>
            <Label htmlFor="registrationFee" className="text-gray-300">Registration Fee (e.g., 10.00 for ₹10.00)</Label>
            <Input 
              id="registrationFee" 
              name="registrationFee" 
              type="number" 
              step="0.01" 
              value={formData.registrationFee / 100} // Display in currency units
              onChange={onInputChange} 
              className="bg-gray-700 border-gray-600 text-white" 
              required 
            />
          </div>
          <div>
            <Label htmlFor="currency" className="text-gray-300">Currency</Label>
            <Input 
              id="currency" 
              name="currency" 
              value={formData.currency} 
              onChange={onInputChange} 
              className="bg-gray-700 border-gray-600 text-white" 
              required 
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={onInputChange} 
              className="bg-gray-700 border-gray-600 text-white" 
              rows={3}
            />
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox 
              id="isActive" 
              name="isActive" 
              checked={formData.isActive} 
              onCheckedChange={(checked) => onInputChange({ target: { name: "isActive", type: "checkbox", checked } })} 
            />
            <Label htmlFor="isActive" className="text-gray-300">Set as active event immediately</Label>
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="text-gray-300 border-gray-600 hover:bg-gray-700">Cancel</Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">{isEditMode ? "Save Changes" : "Create Event"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
