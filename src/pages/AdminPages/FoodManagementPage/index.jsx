import DialogFoodManagement from "@/components/DialogFoodManagement";
import ManagementTable from "@/components/ManagementTable";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  addFood,
  changeAvailable,
  deleteFood,
  getAllFoods,
  updateFood,
} from "@/services/api/food";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const FoodManagementPage = () => {
  const [food, setFood] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [textButton, setTextButton] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [available, setAvailable] = useState(false);
  const [idUpdate, setIdUpdate] = useState(null);
  const [foodManagement, setFoodManagement] = useState([
    {
      title: "ID",
      classNameTitle: "w-12",
      className: "font-mono text-sm text-muted-foreground",
      key: (key) => `${key + 1}`,
    },
    {
      title: "Image",
      render: (row) => (
        <img
          src={row.image_url}
          alt=""
          className="w-12 h-12 rounded-lg object-cover"
        />
      ),
      classNameTitle: "w-20",
    },
    {
      title: "Name",
      render: (row) => `${row.name}`,
    },
    {
      title: "Price",
      render: (row) => `$${row.price}`,
      className: "font-semibold text-primary",
    },
    {
      title: "Description",
      render: (row) => `${row.description}`,
    },
    {
      title: "Available",
      render: (row) => (
        <Switch
          checked={row.is_available}
          onCheckedChange={async (checked) => {
            setFood((prev) =>
              prev.map((item) =>
                item._id === row._id ? { ...item, is_available: checked } : item
              )
            );
            await changeAvailable(row._id, { is_available: checked });
          }}
        />
      ),
      classNameTitle: "w-28",
    },
    {
      title: "Actions",
      render: (row, show, status, foods) => (
        <div className="flex items-center gap-1">
          <Button
            onClick={() => handleOpenDialog(row._id, foods)}
            className="text-black bg-transparent hover:text-accent-foreground hover:bg-accent"
          >
            <Pencil />
          </Button>
          <Button
            onClick={() => handleDeleteFood(row._id)}
            className="text-destructive bg-transparent hover:text-accent-foreground hover:bg-accent"
          >
            <Trash2 />
          </Button>
        </div>
      ),
      classNameTitle: "w-24",
    },
  ]);
  const getFoods = async () => {
    try {
      const res = await getAllFoods();
      setFood(res.data.data);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFoods();
  }, []);
  const handleOpenDialog = (id, foods) => {
    if (id) {
      const newFood = foods.find((item) => item._id == id);
      console.log("newFood", newFood);
      setTitle("Edit food");
      setTextButton("Save Changes");
      setIdUpdate(newFood._id);
      setName(newFood.name);
      setPrice(newFood.price);
      setDescription(newFood.description);
      setImage(newFood.image_url);
      setCategory(newFood.category);
      setAvailable(newFood.is_available);
    } else {
      setTitle("Add new food");
      setTextButton("Add Food");
      setIdUpdate(null);
    }
    setOpen(!open);
  };
  const handleFood = async () => {
    try {
      console.log("idUpdate", idUpdate);
      if (idUpdate !== null) {
        const res = await updateFood(idUpdate, {
          name,
          price,
          description,
          image_url: image,
          category,
          is_available: available,
        });
        console.log(res);
        toast.success("Update food successfully!");
        setIdUpdate(null);
        setOpen(false);
        getFoods();
      } else {
        const res = await addFood({
          name,
          price,
          description,
          image_url: image,
          category,
          is_available: available,
        });
        console.log(res);
        toast.success("Add food successfully!");
        setOpen(false);
        getFoods();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const handleDeleteFood = async (id) => {
    try {
      console.log("idDelete", id);
      const res = await deleteFood(id);
      console.log(res);
      toast.success("Delete food successfully!");
      getFoods();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between gap-4 mb-6 flex-col sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold">Manage Foods</h1>
        <Button onClick={() => handleOpenDialog()}>
          <Plus />
          <span>Add New Food</span>
        </Button>
      </div>
      <ManagementTable columns={foodManagement} rows={food} foods={food} />
      <DialogFoodManagement
        open={open}
        onOpenChange={setOpen}
        name={name}
        price={price}
        description={description}
        image={image}
        category={category}
        available={available}
        setName={setName}
        setPrice={setPrice}
        setDescription={setDescription}
        setImage={setImage}
        setCategory={setCategory}
        setAvailable={setAvailable}
        handle={handleFood}
        title={title}
        textButton={textButton}
      />
    </div>
  );
};

export default FoodManagementPage;
