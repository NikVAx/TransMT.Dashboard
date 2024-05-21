import { yupResolver } from "@hookform/resolvers/yup";
import { observer } from "mobx-react-lite";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import {
  FormAutoComplete,
  FormInputText,
  FormWrapper,
  PageButtons,
  PageWrapper,
  PanelV,
} from "@/components";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useStore } from "@/app/store";
import { useNavigate, useParams } from "react-router-dom";
import {
  IEditVehicleDto,
  getVehicleValidationSchema,
} from "@/features/entities/vehicle";
import { IBuilding } from "@/features";
import { AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { useComponentDidMount } from "@/shared/hooks";

export const VehicleEditPage = observer(() => {
  const { vehicleStore, buildingStore } = useStore((store) => ({
    vehicleStore: store.vehicleStore,
    buildingStore: store.buildingStore,
  }));

  const { id } = useParams();

  const methods = useForm({
    defaultValues: {
      number: "",
      type: "",
      storageArea: null!,
      operatingStatus: "Нет",
    },
    resolver: yupResolver(getVehicleValidationSchema()),
  });
  const navigate = useNavigate();

  useComponentDidMount(async () => {
    if (!id) return navigate("/not-found");

    const status = await vehicleStore.getVehicleById(id);

    if (!status.isSuccess) {
      return navigate("/not-found");
    }

    methods.reset({
      ...status.data!,
      storageArea: status.data!.storageArea,
    });
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    const status = await vehicleStore.editVehicleById(id!, {
      operatingStatus: data.operatingStatus,
      number: data.number,
      type: data.type,
      storageAreaId: data.storageArea.id,
    } as IEditVehicleDto);

    if (status.isSuccess) {
      navigate("/entities/vehicles");
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
    const prevPageSize = buildingStore.pagination.pageSize;
    buildingStore.pagination.pageSize = 10000;
    buildingStore.getBuildingsPage();
    return () => {
      buildingStore.pagination.pageSize = prevPageSize;
    };
  }, []);

  const itemTemplate = (building: IBuilding) => {
    return (
      <div>
        <div>
          {building.name}, {building.address}
        </div>
        <small>{building.id}</small>
      </div>
    );
  };

  const [buildingSuggestions, setBuildingSuggestions] = useState<IBuilding[]>(
    []
  );

  const search = (event: AutoCompleteCompleteEvent) => {
    const filtered = buildingStore.buildings.filter(
      (x) =>
        x.id.toUpperCase().includes(event.query.toUpperCase()) ||
        x.name.toUpperCase().includes(event.query.toUpperCase()) ||
        (x.address ?? "").toUpperCase().includes(event.query.toUpperCase())
    );

    setBuildingSuggestions(filtered);
  };

  return (
    <PageWrapper>
      <Toast ref={toast} position="top-center" />
      <FormWrapper
        onSubmit={onSubmit}
        onError={onSubmitError}
        methods={methods}
      >
        <PanelV>
          <PanelV.Header>Основная информация</PanelV.Header>
          <PanelV.Content>
            <FormInputText name="number" label="Номер ТС" labelType="fixed" />
            <FormInputText name="type" label="Тип ТС" labelType="fixed" />
            <FormAutoComplete
              field="name"
              dropdown
              label="Зона хранения"
              labelType="fixed"
              name="storageArea"
              suggestions={buildingSuggestions}
              completeMethod={search}
              itemTemplate={itemTemplate}
              forceSelection
              value="default"
            />
          </PanelV.Content>
        </PanelV>
        <PageButtons>
          <Button type="submit" label="Сохранить" />
        </PageButtons>
      </FormWrapper>
    </PageWrapper>
  );
});
