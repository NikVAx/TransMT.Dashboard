import { mock } from "@/app/mock";
import { useStore } from "@/app/store";
import {
  FormColorPicker,
  FormDropdown,
  FormInputText,
  FormWrapper,
  MapBox,
  PageButtons,
  PageWrapper,
  PanelV,
} from "@/components";
import { MapPolygonEdit } from "@/components/mapPolygonEdit/mapPolygonEdit";
import {
  ICreateGeoZoneDto,
  MapPolygonStore,
  getGeoZoneValidationSchema,
} from "@/features";
import { yupResolver } from "@hookform/resolvers/yup";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Polygon, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom";

const editPolygonStore = new MapPolygonStore();

export const GeoZoneCreatePage = observer(() => {
  const navigate = useNavigate();

  const { geoZoneStore } = useStore((store) => ({
    geoZoneStore: store.geoZoneStore,
  }));

  const toast = useRef<Toast>(null);

  const methods = useForm({
    defaultValues: {
      name: "",
      type: mock.geoZoneTypes[0].name,
      color: "6466f1",
    },
    resolver: yupResolver(getGeoZoneValidationSchema()),
  });

  const onSubmitHandler: SubmitHandler<ICreateGeoZoneDto> = async (data) => {
    const points = editPolygonStore.getPositions();
    if (points.length < 3) {
      methods.setError("root.points", {
        message: "Геозона должна содержать по крайней мере 3 точки",
      });
      return;
    }
    methods.clearErrors();

    const status = await geoZoneStore.createGeoZone({
      name: data.name,
      type: data.type,
      color: data.color,
      points: editPolygonStore.getPositions(),
    });

    if (status.isSuccess) {
      editPolygonStore.nodes = [];
      navigate("/entities/geozones");
    } else {
      console.log(status);
    }
  };

  methods.watch("color");

  return (
    <PageWrapper>
      <Toast ref={toast} position="top-center" />
      <FormWrapper onSubmit={onSubmitHandler} methods={methods}>
        <PanelV>
          <PanelV.Header>Основная информация</PanelV.Header>
          <PanelV.Content>
            <FormInputText name="name" label="Наименование" labelType="fixed" />
            <FormDropdown
              name="type"
              label="Тип геозоны"
              labelType="fixed"
              options={[...mock.geoZoneTypes.map((x) => x.name)]}
            />
            <FormColorPicker
              format="hex"
              label="Цвет зоны"
              name="color"
              spanStyle={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                gap: "5px",
              }}
            />
          </PanelV.Content>
        </PanelV>
        <PanelV>
          <PanelV.Header>Редактор области</PanelV.Header>
          <PanelV.Content>
            <MapBox
              center={[59.938784, 30.314997]}
              zoom={13}
              style={{ height: "600px" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Polygon
                positions={editPolygonStore.getPositions()}
                pathOptions={{
                  color: editPolygonStore.isEditing
                    ? "black"
                    : `#${methods.getValues("color")}`,
                  fillColor: editPolygonStore.isEditing
                    ? "black"
                    : `#${methods.getValues("color")}`,
                }}
              />
              <MapPolygonEdit store={editPolygonStore} />
            </MapBox>
          </PanelV.Content>
        </PanelV>
        <PageButtons>
          <Button type="submit" label="Сохранить" />
        </PageButtons>
      </FormWrapper>
    </PageWrapper>
  );
});
