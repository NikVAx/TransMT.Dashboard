import { useStore } from "@/app/store";
import {
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
import { useComponentDidMount } from "@/shared/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { ColorPicker } from "primereact/colorpicker";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Polygon, TileLayer } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";

const editPolygonStore = new MapPolygonStore();

const geoZoneTypes = [
  { name: "Не определен", defaultColor: "" },
  { name: "Зона хранения", defaultColor: "" },
  { name: "Зона погрузки", defaultColor: "" },
  { name: "Зона разгрузки", defaultColor: "" },
  { name: "Опасная зона", defaultColor: "" },
  { name: "Пешеходная зона", defaultColor: "" },
];

export const GeoZoneEditPage = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { geoZoneStore } = useStore((store) => ({
    geoZoneStore: store.geoZoneStore,
  }));
  const [сolor, setColor] = useState("6466f1");

  const methods = useForm({
    defaultValues: {
      name: "",
      type: geoZoneTypes[0].name,
      color: "6466f1",
    },
    resolver: yupResolver(getGeoZoneValidationSchema()),
  });

  useComponentDidMount(async () => {
    if (!id) return navigate("/not-found");

    const status = await geoZoneStore.getGeoZoneById(id);

    if (!status.isSuccess) {
      return navigate("/not-found");
    }

    methods.reset({ ...status.data! });
    setColor(status.data!.color.slice(1));
    editPolygonStore.nodes = status.data!.points.map(
      (node, i) => new MapDragNode(node, i)
    );
    editPolygonStore.isComplited = true;
  });

  const toast = useRef<Toast>(null);

  const onSubmit: SubmitHandler<ICreateGeoZoneDto> = async (data) => {
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

  const onSubmitError = (e: any) => {
    console.log(e);
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
            <FormInputText name="name" label="Наименование" labelType="fixed" />
            <FormDropdown
              name="type"
              label="Тип геозоны"
              labelType="fixed"
              options={[...geoZoneTypes.map((x) => x.name)]}
            />

            <div>
              <span className="pr-2">Цвет зоны</span>
              <ColorPicker
                format="hex"
                value={сolor}
                onChange={(e) => {
                  setColor(e.value as string);
                  methods.setValue("color", `#${e.value}`);
                }}
                className="mb-3"
              />
            </div>
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
                    color: `#${сolor}`,
                    fillColor: `#${сolor}`,
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
