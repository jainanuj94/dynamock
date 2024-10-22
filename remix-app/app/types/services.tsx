import {ColumnDef} from "@tanstack/react-table";

export type Services = {
    id: number
    serviceName: string
    httpMethod: string
    baseUrl: string
    defaultTo?: string
    path: string
    uniqueKey: string
    uniqueKeyLocation: string
    uniqueKeyPath: string
}

export const serviceColumns: ColumnDef<Services>[] = [
    {
        accessorKey: "id",
        header: () => <div className="text-right">Id</div>,
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.getValue("id")}</div>
        },
    },
    {
        accessorKey: "serviceName",
        header: () => <div className="text-right">Service Name</div>,
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.getValue("serviceName")}</div>
        },
    },
    {
        accessorKey: "httpMethod",
        header: () => <div className="text-right">Http Method</div>,
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.getValue("httpMethod")}</div>
        },
    },
    {
        accessorKey: "baseUrl",
        header: () => <div className="text-right">Base Url</div>,
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.getValue("baseUrl")}</div>
        },
    },
    {
        accessorKey: "defaultTo",
        header: () => <div className="text-right">Default To</div>,
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.getValue("defaultTo")}</div>
        },
    },
    {
        accessorKey: "path",
        header: () => <div className="text-right">Path</div>,
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.getValue("path")}</div>
        },
    },
    {
        accessorKey: "uniqueKey",
        header: () => <div className="text-right">Unique Key</div>,
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.getValue("uniqueKey")}</div>
        },
    },
    {
        accessorKey: "uniqueKeyLocation",
        header: () => <div className="text-right">Unique Key Location</div>,
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.getValue("uniqueKeyLocation")}</div>
        },
    },
    {
        accessorKey: "uniqueKeyPath",
        header: () => <div className="text-right">Unique Key Path</div>,
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.getValue("uniqueKeyPath")}</div>
        },
    },
]