import { ReactElement, createElement, useCallback } from "react";

import { ClusterMapContainerProps } from "../typings/ClusterMapProps";
import "./ui/ClusterMap.css";
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from "@react-google-maps/api";
import React, { useState } from "react";
import { AppartmentsCluster } from "./models/appartments-cluster.model";
import { ListValue } from "mendix";
import { Appartment } from "./models/appartment.model";
import { AppConfig } from "./config/app.config";
import { GmapPosition } from "./models/gmap-position.model";
import { svgMarker as svgImage } from "./config/maps.param";

export function ClusterMap(props: ClusterMapContainerProps): ReactElement {
    const { appartments, onClickAction, city, ident, coordinateX, coordinateY } = props;
    const onClickHandler = useCallback(() => {
        if (onClickAction && onClickAction.canExecute) {
            onClickAction.execute();
        }
    }, [onClickAction]);

    const containerStyle = {
        width: "100%",
        height: "calc(100vh - 120px)"
    };

    const [clusters, setClusters] = useState([]);
    const [zoom, setZoom] = useState(0);
    const [center, setCenter] = useState(null);
    const [apiKey] = useState(AppConfig.googleMaps.apiKey);
    const [svgMarker] = useState(svgImage);

    const appartmentsToCityClusters = (listValue: ListValue) => {
        const result = [] as AppartmentsCluster[];

        if (listValue.items && listValue.items.length > 0) {
            listValue.items.forEach(item => {
                const appartCity = city.get(item).displayValue;
                const cityIndex = result.findIndex(
                    a => a.city.toLowerCase().trim() === appartCity.toLowerCase().trim()
                );
                const appart = {
                    id: ident.get(item).displayValue,
                    city: appartCity,
                    coordinateX: +coordinateX.get(item).displayValue,
                    coordinateY: +coordinateY.get(item).displayValue
                } as Appartment;

                if (cityIndex > -1) {
                    result[cityIndex].appartments.push(appart);
                } else {
                    result.push({
                        city: appartCity,
                        appartments: [appart]
                    });
                }
            });
        }

        return result;
    };

    React.useEffect(() => {
        setClusters(appartmentsToCityClusters(appartments));

        setCenter({
            lat: AppConfig.googleMaps.defaultCenterLat,
            lng: AppConfig.googleMaps.defaultCenterLng
        });
        setZoom(AppConfig.googleMaps.defaultZoom);

        // If there is only one city, we center the map on that city
        if (clusters && clusters.length === 1) {
            setCenter({
                lat: clusters[0].appartments[0].coordinateX,
                lng: clusters[0].appartments[0].coordinateY
            });
            setZoom(AppConfig.googleMaps.cityZoom);
        }
    }, [appartments]);

    const getPosition = (appart: Appartment): GmapPosition => {
        return {
            lat: appart.coordinateX,
            lng: appart.coordinateY
        };
    };

    function createKey(appart: Appartment) {
        return appart.coordinateX + appart.coordinateY;
    }

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            {clusters && clusters.length > 0 ? (
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
                    <MarkerClusterer>
                        {clusterer =>
                            clusters[0].appartments.map(appart => (
                                <Marker
                                    onClick={() => setCenter(getPosition(appart))}
                                    key={createKey(appart)}
                                    position={getPosition(appart)}
                                    label={{ text: appart.id.toString(), color: "white" }}
                                    clusterer={clusterer}
                                    icon={svgMarker as any}
                                />
                            ))
                        }
                    </MarkerClusterer>
                </GoogleMap>
            ) : (
                <div></div>
            )}
        </LoadScript>
    );
}
