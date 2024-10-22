import {ColumnDef} from "@tanstack/react-table";

export type UniqueKeys = {
    key: string
    startingValue: string
    incrementRule: string
    customRule?: string
}

export const uniqueKeyColumns: ColumnDef<UniqueKeys>[] = [
    {
        accessorKey: "key",
        header: () => <div className="text-right">Unique Key</div>,
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.getValue("key")}</div>
        },
    },
    {
        accessorKey: "startingValue",
        header: () => <div className="text-right">Starting Value</div>,
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.getValue("startingValue")}</div>
        },
    },
    {
        accessorKey: "incrementRule",
        header: () => <div className="text-right">Increment Rule</div>,
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.getValue("incrementRule")}</div>
        },
    },
]