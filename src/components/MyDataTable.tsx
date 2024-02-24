import { IconChevronDown } from "@tabler/icons-react";
import DataTable from "react-data-table-component";
import Checkbox from "./Checkbox";
import SectionLoading from "./SectionLoading";
import TablerIcon from "./TablerIcon";


const defaultCustomStyles = {
    rows: {
        style: {
            fontSize: "1rem !important",
            color: "var(--bs-body-color)",
        },
    },
    headCells: {
        style: {
            fontSize: "1rem !important",
            color: "var(--bs-body-color)",
        },
    },
    cells: {
        style: {

        },
    },
} as const;

export default function MyDataTable({ customStyles={}, ...rest})
{
    return <DataTable
        sortIcon={<TablerIcon icon={IconChevronDown} />}
        selectableRowsComponent={Checkbox}
        customStyles={{ ...defaultCustomStyles, ...customStyles }}
        progressComponent={<SectionLoading center />}
        {...rest}
    />
}
