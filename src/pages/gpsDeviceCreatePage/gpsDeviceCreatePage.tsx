import { yupResolver } from "@hookform/resolvers/yup";
import { observer } from "mobx-react-lite";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import {
  FormAutoComplete,
  FormWrapper,
  PageWrapper,
  PanelV,
} from "@/components";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useStore } from "@/app/store";
import { useNavigate } from "react-router-dom";
import { IVehicle } from "@/features/entities/vehicle";
import { IBuilding } from "@/features";
import { AutoCompleteCompleteEvent } from "primereact/autocomplete";
import {
  ICreateGpsDeviceDto,
  getGpsDeviceValidationSchema,
} from "@/features/entities/gpsDevice";

export const GpsDeviceCreatePage = observer(() => {
  const { deviceStore: deviceStore, vehicleStore: vehicleStore } = useStore(
    (store) => ({
      deviceStore: store.deviceStore,
      vehicleStore: store.vehicleStore,
    })
  );

  const methods = useForm({
    defaultValues: {
      number: "",
      type: "",
      storageArea: null!,
      operatingStatus: "Нет",
    },
    resolver: yupResolver(getGpsDeviceValidationSchema()),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    const status = await deviceStore.createGpsDevice({
      vehicleId: data.vehicle.id,
    } as ICreateGpsDeviceDto);

    if (status.isSuccess) {
      navigate("/entities/devices");
    } else {
      console.log(status);
    }
  };

  const onSubmitError = (e: any) => {
    console.log(e);
    console.log(methods.getValues());
  };

  const toast = useRef<Toast>(null);

  useEffect(() => {
    const prevPageSize = vehicleStore.pagination.pageSize;
    vehicleStore.pagination.pageSize = 10000;
    vehicleStore.getVehiclesPage();
    return () => {
      vehicleStore.pagination.pageSize = prevPageSize;
    };
  }, []);

  const itemTemplate = (vehicle: IVehicle) => {
    return (
      <div>
        <div>
          ТС №{vehicle.number}, тип "{vehicle.type}"
        </div>
        <small>{vehicle.id}</small>
      </div>
    );
  };

  const [vehicleSuggestions, setVehicleSuggestions] = useState<IVehicle[]>([]);

  const search = (event: AutoCompleteCompleteEvent) => {
    const filtered = vehicleStore.vehicles.filter(
      (x) =>
        x.id.toUpperCase().includes(event.query.toUpperCase()) ||
      x.type.toUpperCase().includes(event.query.toUpperCase()) ||
        x.number.toUpperCase().includes(event.query.toUpperCase())
    );

    setVehicleSuggestions(filtered);
  };

  return (
    <PageWrapper>
      <Toast ref={toast} position="top-center" />
      <FormWrapper
        onSubmit={onSubmit}
        onError={onSubmitError}
        methods={methods}
        className="flex flex-column gap-4"
      >
        <PanelV title="Основная информация">
          <FormAutoComplete
            field="number"
            dropdown
            label="Транспортное средство"
            labelType="fixed"
            name="vehicle"
            suggestions={vehicleSuggestions}
            completeMethod={search}
            itemTemplate={itemTemplate}
            forceSelection
          />
        </PanelV>
        <div
          className="flex flex-row-reverse gap-2"
          style={{
            paddingBottom: "20px",
          }}
        >
          <Button type="submit" label="Сохранить" />
        </div>
      </FormWrapper>
    </PageWrapper>
  );
});
