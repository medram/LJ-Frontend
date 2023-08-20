import DataTable from "react-data-table-component";
import TablerIcon from "./TablerIcon";
import { IconChevronDown } from "@tabler/icons-react";
import Checkbox from "./Checkbox";
import SectionLoading from "./SectionLoading";


const defaultCustomStyles = {
    rows: {
        style: {
            fontSize: "1rem !important",
            color: "var(--bs-primary)",
        },
    },
    headCells: {
        style: {
            fontSize: "1rem !important",
            color: "var(--bs-primary)",
        },
    },
    cells: {
        style: {

        },
    },
};

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
