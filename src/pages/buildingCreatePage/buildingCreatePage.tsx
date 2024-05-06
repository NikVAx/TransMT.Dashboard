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
} from "@/components";
import {
  ICreateBuildingDto,
  getBuildingValidationSchema,
} from "@/features/entities/building";
import { useEffect, useRef, useState } from "react";
import { LatLng, LeafletMouseEvent, latLng } from "leaflet";
import { useComponentDidMount } from "@/shared/hooks";
import {
  ISuggestion,
  ISuggestions,
} from "@/features/maps/geocoding/geocoding.types";
import { getAddressByGeopointFromDadataRequest } from "@/features/maps";
import { Toast } from "primereact/toast";

export const BuildingCreatePage = observer(() => {
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

  const onSubmit: SubmitHandler<ICreateBuildingDto> = (data) => {
    console.log(data);
  };

  const onSubmitError = (e: any) => {
    console.log(e);
  };

  const [mapIsLoading, setMapIsLoading] = useState(true);
  const [position, setPosition] = useState<LatLng>(latLng(55.753927, 37.62082));
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
    methods.setValue("location", position.wrap(), { shouldValidate: true });
    methods.setValue("address", suggestion?.address ?? "", {
      shouldValidate: true,
    });
  }, [position, suggestion]);

  useComponentDidMount(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapIsLoading(true);
        handlePositionChange(
          latLng(position.coords.latitude, position.coords.longitude)
        );
        setMapIsLoading(false);
      },
      () => {
        setMapIsLoading(false);
      }
    );
  });

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
          <FormInputText name="name" label="Наименование" labelType="fixed" />
          <FormInputText name="type" label="Тип здания" labelType="fixed" />
        </PanelV>

        <PanelV title="Расположение">
          <FormInputText name="address" label="Адрес" labelType="fixed" />
          <div className="flex gap-3">
            <FormInputText
              name="location.lat"
              label="Широта"
              labelType="fixed"
            />
            <FormInputText
              name="location.lng"
              label="Долгота"
              labelType="fixed"
            />
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

          <div
            style={{ minHeight: "400px", maxHeight: "800px", height: "75dvh" }}
          >
            <MapSelectAddress
              onChange={onChangePosition}
              position={position}
              isLoading={mapIsLoading}
            />
          </div>
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
