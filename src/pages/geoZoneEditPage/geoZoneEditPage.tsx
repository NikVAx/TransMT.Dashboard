import { mock } from "@/app/mock";
import { useStore } from "@/app/store";
import {
  FormColorPicker,
  FormDropdown,
  FormInputErrorMessage,
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
  MapDragNode,
  MapPolygonStore,
  getGeoZoneValidationSchema,
} from "@/features";
import { yupResolver } from "@hookform/resolvers/yup";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Polygon, TileLayer } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";

const editPolygonStore = new MapPolygonStore();

export const GeoZoneEditPage = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { geoZoneStore } = useStore((store) => ({
    geoZoneStore: store.geoZoneStore,
  }));

  const methods = useForm({
    defaultValues: {
      name: "",
      type: mock.geoZoneTypes[0].name,
      color: "#6466f1",
    },
    resolver: yupResolver(getGeoZoneValidationSchema()),
  });

  const handleLoadPage = async () => {
    if (!id) return navigate("/not-found");

    const status = await geoZoneStore.getGeoZoneById(id);

    if (!status.isSuccess) {
      return navigate("/not-found");
    }

    methods.reset({ ...status.data! });
    editPolygonStore.nodes = status.data!.points.map(
      (node, i) => new MapDragNode(node, i)
    );
    editPolygonStore.isComplited = true;
  };

  useEffect(() => {
    handleLoadPage();
  }, []);

  const toast = useRef<Toast>(null);

  const onSubmitHandler: SubmitHandler<ICreateGeoZoneDto> = async (data) => {
    console.log(data);
    const points = editPolygonStore.getPositions();
    if (points.length < 3) {
      methods.setError("root.points", {
        message: "Геозона должна содержать по крайней мере 3 точки",
      });
      return;
    }
    methods.clearErrors();

    const status = await geoZoneStore.editGeoZoneById(id!, {
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

              {editPolygonStore.isEditing ? (
                <Polygon
                  positions={editPolygonStore.getPositions()}
                  pathOptions={{
                    color: "black",
                  }}
                />
              ) : (
                <Polygon
                  positions={editPolygonStore.getPositions()}
                  pathOptions={{
                    color: `#${methods.getValues("color")}`,
                    fillColor: `#${methods.getValues("color")}`,
                  }}
                />
              )}
              <MapPolygonEdit store={editPolygonStore} />
            </MapBox>
          </PanelV.Content>
          <FormInputErrorMessage root name="points" />
        </PanelV>
        <PageButtons>
          <Button type="submit" label="Сохранить" />
        </PageButtons>
      </FormWrapper>
    </PageWrapper>
  );
});
