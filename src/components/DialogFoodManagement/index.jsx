import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
const DialogFoodManagement = ({
  open,
  onOpenChange,
  name,
  price,
  description,
  image,
  category,
  available,
  setName,
  setPrice,
  setDescription,
  setImage,
  setCategory,
  setAvailable,
  handle,
  title,
  textButton,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Food name"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="name-1">Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Food description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Price ($)</Label>
              <Input
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                type="number"
                placeholder="0.00"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Category</Label>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
              />
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="name-1">Image URL</Label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://...(optional)"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox checked={available} onCheckedChange={(checked) => setAvailable(checked)} />
            <Label className="font-medium">Available for order</Label>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={() => handle()} type="submit">
            {textButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFoodManagement;
