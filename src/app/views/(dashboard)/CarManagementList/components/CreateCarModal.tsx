import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Modal from "@mui/material/Modal";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";
import TextField from "@/app/components/base/TextField";
import Typography from "@/app/components/base/Typography";
import useGetData from "@/app/hooks/useGetData";
import { usePostData, usePutData } from "@/app/hooks/useMutateData";
import LoadingState from "@/app/components/ui/LoadingState";

interface CreateCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: number | null;
  isEdit: boolean;
}

const carSchema = () =>
  z.object({
    brand: z.string().min(3, "Brand must be at least 3 characters long"),
    model: z.string().min(3, "Model must be at least 3 characters long"),
    licensePlate : z.string().min(3, "License plate must be at least 3 characters long"),
    rentalRate: z.string().refine((val => Number(val) >= 0), "Rental rate must be greater than 0"),
  });

type FormSchema = z.infer<ReturnType<typeof carSchema>>;

const CreateCarModal = (props: CreateCarModalProps) => {
  const { isOpen, onClose, id = null, isEdit } = props;

  const { handleSubmit, control, reset } = useForm<FormSchema>({
    resolver: zodResolver(carSchema()),
    defaultValues: {
      brand: '',
      model: '',
      licensePlate: '',
      rentalRate: '',
    },
  });

  const { mutate, loading } = usePostData("api/cars");

  const { mutate: mutateEditUser } = usePutData(
    `api/api-dash/user/${id}/update`
  );

  const onSubmitForm = async (data: FormSchema) => {
    if (id) {
      mutateEditUser(data)
        .then(() => {
          handleClose();
          Swal.fire({
            title: "Success!",
            text: "Data Berhasil Diedit",
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((err) => console.log(err));
    } else {
      mutate({
        brand: data.brand,
        model: data.model,
        licensePlate: data.licensePlate,
        rentalRate: Number(data.rentalRate),
      })
        .then(() => {
          handleClose();
          Swal.fire({
            title: "Success!",
            text: "Data Berhasil Ditambah",
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const isLoading = isEdit;

  const handleClose = () => {
    reset({
      brand: '',
      model: '',
      licensePlate: '',
      rentalRate: '',
    });
    onClose();
  };

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="create-car-modal"
      aria-describedby="create-car-modal-description"
    >
      <Box sx={style}>
        {isLoading ? (
         <LoadingState />
        ) : (
          <>
            <Typography size={1.7} weight={1.1}>
              {isEdit ? "Edit" : "Create"} Car
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmitForm)}
              className="flex flex-col gap-4"
              noValidate
            >
              <Grid container spacing={2} marginTop={2}>
                <Grid size={12}>
                  <Controller
                    name="brand"
                    control={control}
                    render={({
                      field: { value, onChange, ref },
                      fieldState: { error },
                    }) => (
                      <TextField
                        name="brand"
                        label="Brand"
                        required
                        ref={ref}
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        errorMsg={error && error.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={12}>
                  <Controller
                    name="model"
                    control={control}
                    render={({
                      field: { value, onChange, ref },
                      fieldState: { error },
                    }) => (
                      <TextField
                        name="model"
                        label="Model"
                        required
                        ref={ref}
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        errorMsg={error && error.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={12}>
                  <Controller
                    name="licensePlate"
                    control={control}
                    render={({
                      field: { value, onChange, ref },
                      fieldState: { error },
                    }) => (
                      <TextField
                        name="licensePlate"
                        label="License Plate"
                        required
                        ref={ref}
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        errorMsg={error && error.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={12}>
                  <Controller
                    name="rentalRate"
                    control={control}
                    render={({
                      field: { value, onChange, ref },
                      fieldState: { error },
                    }) => (
                      <TextField
                        type="number"
                        name="rentalRate"
                        label="Rental Rate"
                        required
                        ref={ref}
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        errorMsg={error && error.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="primary">
                {id ? "Edit" : "Create"}
              </Button>
            </form>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CreateCarModal;