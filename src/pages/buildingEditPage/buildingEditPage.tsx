import { yupResolver } from "@hookform/resolvers/yup";
import { observer } from "mobx-react-lite";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import {
  FormInputText,
  FormWrapper,
  PageWrapper,
  MapSelectAddress,
  PanelV,
  FormDropdown,
  PageButtons,
} from "@/components";
import {
  ICreateBuildingDto,
  getBuildingValidationSchema,
} from "@/features/entities/building";
import { useEffect, useRef, useState } from "react";
import { LatLng, LeafletMouseEvent, latLng } from "leaflet";
import {
  ISuggestion,
  ISuggestions,
} from "@/features/maps/geocoding/geocoding.types";
import { getAddressByGeopointFromDadataRequest } from "@/features/maps";
import { Toast } from "primereact/toast";
import { FormInputNumber } from "@/components/formInputNumber";
import { useStore } from "@/app/store";
import { useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { useLayout } from "@/layouts/layout/context/layout.hooks";
import { mock } from "@/app/mock";

export const BuildingEditPage = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { buildingStore } = useStore((store) => ({
    buildingStore: store.buildingStore,
  }));

  const methods = useForm<ICreateBuildingDto>({
    defaultValues: {
      name: "",
      address: "",
      type: "",
      location: {
        lat: 0,
        lng: 0,
      },
    },
    resolver: yupResolver(getBuildingValidationSchema()),
  });

  const onSubmit: SubmitHandler<ICreateBuildingDto> = async (data) => {
    const status = await buildingStore.editBuildingById(id!, data);

    if (status.isSuccess) {
      navigate("/entities/buildings");
    } else {
      console.log(status);
    }
  };

  const onSubmitError = (e: any) => {
    console.log(e);
  };

  const [mapIsLoading, setMapIsLoading] = useState(true);
  const [position, setPosition] = useState<LatLng>(latLng(0, 0));
  const [suggestion, setSuggestion] = useState<ISuggestion | null>(null);
  const toast = useRef<Toast>(null);

  const handlePositionChange = async (latlng: LatLng) => {
    setPosition(latlng);
    const [status, response] = await getAddressByGeopointFromDadataRequest(
      latlng
    );

    const data = response as ISuggestions;

    if (status && data.suggestions.length > 0) {
      setSuggestion(data.suggestions[0]);
    } else {
      setSuggestion(null);
      toast.current!.show({
        severity: "warn",
        summary: "Предупреждение",
        detail: "Не удалось найти адрес по заданным координатам",
        life: 5000,
      });
    }
  };

  const onChangePosition = async (event: LeafletMouseEvent) => {
    handlePositionChange(event.latlng);
  };

  useEffect(() => {
    methods.setValue("location", position!.wrap(), { shouldValidate: true });
    methods.setValue("address", suggestion?.address ?? "", {
      shouldValidate: true,
    });
  }, [position, suggestion]);

  const handleLoadPage = async () => {
    if (!id) return navigate("/not-found");

    const status = await buildingStore.getBuildingById(id);

    if (!status.isSuccess) {
      return navigate("/not-found");
    }

    methods.reset({
      ...status.data,
    });

    setPosition(latLng(status.data!.location.lat, status.data!.location.lng));
    setMapIsLoading(false);
  };

  useEffect(() => {
    handleLoadPage();
  }, []);

  const layout = useLayout();

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
            <FormInputText name="name" label="Наименование" labelType="fixed" />
            <FormDropdown
              name="type"
              labelType="fixed"
              label="Тип здания"
              options={mock.buildingTypes}
              filter
              placeholder="Выбор типа здания"
              className="w-full"
            />
          </PanelV.Content>
        </PanelV>

        <PanelV>
          <PanelV.Header>Расположение</PanelV.Header>
          <PanelV.Content>
            <FormInputText name="address" label="Адрес" labelType="fixed" />
            <div
              className={classNames("flex gap-3", {
                "flex-column": layout.displayMode === "small",
              })}
            >
              <FormInputNumber
                name="location.lat"
                label="Широта"
                labelType="fixed"
                inputMode="numeric"
                mode="decimal"
                useGrouping={false}
                min={-90}
                max={90}
                maxFractionDigits={8}
              />
              <FormInputNumber
                name="location.lng"
                label="Долгота"
                labelType="fixed"
                inputMode="numeric"
                mode="decimal"
                useGrouping={false}
                min={-180}
                max={180}
                maxFractionDigits={8}
              />

              <div className="flex gap-3">
                <Button
                  type="button"
                  label="Применить"
                  style={{ alignSelf: "end" }}
                  tooltip="Найти расположение по заданным координатам"
                  onClick={() => {
                    const l = methods.getValues().location;
                    handlePositionChange(latLng(l.lat, l.lng));
                  }}
                />

                <Button
                  type="button"
                  label="Отменить"
                  style={{ alignSelf: "end" }}
                  tooltip="Вернуть значение координат до редактирования"
                  onClick={() => {
                    methods.setValue("location", position, {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
            </div>

            <div
              style={{
                minHeight: "400px",
                maxHeight: "800px",
                height: "75dvh",
              }}
            >
              <MapSelectAddress
                onChange={onChangePosition}
                position={position}
                isLoading={mapIsLoading}
              />
            </div>
          </PanelV.Content>
        </PanelV>
        <PageButtons>
          <Button type="submit" label="Сохранить" />
        </PageButtons>
      </FormWrapper>
    </PageWrapper>
  );
});
