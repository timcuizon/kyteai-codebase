import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftAlert from "components/SoftAlert";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DataGrid } from "@mui/x-data-grid";

function HistoryRecordKeeping() {
  return (
    <SoftBox py={0}>
      <SoftBox mb={3}>
        <Card p={2}>
          <SoftBox p={2}>
            <Grid container lg={12} item xs={12} xl={12} md={12} sm={12}>
              <Grid
                display="flex "
                justify="center"
                alignItems="center"
                item
                lg={3}
                md={12}
                sm={12}
                xs={12}
              >
                <SoftBox p={3}>
                  <SoftTypography
                    variant="h6"
                    color="info"
                    sx={{ borderBottom: "3px #FDB813 solid" }}
                  >
                    Record Keeping List
                  </SoftTypography>
                </SoftBox>
              </Grid>
              <Grid item lg={8} md={12} sm={12} xs={12}>
                <span className="w-3/5 mx-3">
                  <SoftInput
                    placeholder="Type here..."
                    icon={{
                      component: "search ",
                      direction: "left",
                    }}
                  />
                </span>
              </Grid>
              <Grid
                display="flex "
                justify="center"
                alignItems="center"
                item
                lg={1}
                md={12}
                sm={12}
                xs={12}
              >
                <SoftBox color="text" px={2}>
                  <Icon
                    sx={{ cursor: "pointer", fontWeight: "bold" }}
                    fontSize="small"
                    onClick={openMenu}
                  >
                    more_vert
                  </Icon>
                </SoftBox>
                {renderMenu}
              </Grid>
            </Grid>
          </SoftBox>

          <SoftBox
            className="p-5"
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <DataGrid
              columns={cols}
              rows={rows}
              rowHeight={120} // Adjust the height as needed
              //filterModel={filterModel}
              //onFilterModelChange={(model) => {setFilterModel(model)}}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
                columns: {
                  columnVisibilityModel: {
                    id: false,
                  },
                },
              }}
              disableColumnMenu
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 20]}
              sx={{
                "& .MuiTablePagination-input": {
                  width: "70px !important",
                },
                "& .MuiTablePagination-menuItem": {
                  width: "70px !important",
                },
                paddingX: "20px",
                border: "none",
              }}
            />
          </SoftBox>
        </Card>
      </SoftBox>
    </SoftBox>
  );
}

export default HistoryRecordKeeping;
