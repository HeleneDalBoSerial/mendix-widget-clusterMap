/**
 * This file was generated from ClusterMap.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export type BootstrapStyleEnum = "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";

export type ClustermapTypeEnum = "badge" | "label";

export interface ClusterMapContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    appartments: ListValue;
    ident?: ListAttributeValue<string>;
    city?: ListAttributeValue<string>;
    coordinateX?: ListAttributeValue<Big>;
    coordinateY?: ListAttributeValue<Big>;
    bootstrapStyle: BootstrapStyleEnum;
    clustermapType: ClustermapTypeEnum;
    onClickAction?: ActionValue;
}

export interface ClusterMapPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    appartments: {} | { caption: string } | { type: string } | null;
    ident: string;
    city: string;
    coordinateX: string;
    coordinateY: string;
    bootstrapStyle: BootstrapStyleEnum;
    clustermapType: ClustermapTypeEnum;
    onClickAction: {} | null;
}
