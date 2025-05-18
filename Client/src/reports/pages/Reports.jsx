import {React, useState, useEffect} from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Gauge } from '@mui/x-charts/Gauge';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import Fab from '@mui/material/Fab';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import AnimatedGauge from '../../common/components/AnimatedGauge';
import Skeleton from '@mui/material/Skeleton';
import CustomBreadcrumb from '../../common/components/CustomBreadcrumb';

const drawerWidth = 300; //240

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
  margin: '0px 10px'
}));


const Reports = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // const [clients, setClients] = useState([]);
  // const [pendingRequests, setPendingRequests] = useState([]);
  // const [pendingChecks, setpendingChecks] = useState([]);
  // const [checksToBeRefunded, setChecksToBeRefunded] = useState([]);
  // const [checksReceivable, setChecksReceivable] = useState([]);
  // const [checksFinished, setChecksFinished] = useState([]);
  // const [totalRequests, setTotalRequests] = useState([]);
  // const [totalRequestsEstatus, setTotalRequestsEstatus] = useState([]);
  // const [totalChecks, setTotalChecks] = useState([]);
  // const [totalChecksEstatus, setTotalChecksEstatus] = useState([]);
  // const [openDialog, setOpenDialog] = useState(false);
  // const [dialogContent, setDialogContent] = useState(null);
  // const [formData, setFormData] = useState({
  //   FechaInicial: null,
  //   FechaFinal: null,
  //   IdCliente: [],
  // });

  // useEffect(() => {
  //   const formDataToSend = new FormData();

  //   // Convertimos a Date si el valor no es nulo ni inválido
  //   const fechaInicial = formData.FechaInicial ? new Date(formData.FechaInicial) : null;
  //   const fechaFinal = formData.FechaFinal ? new Date(formData.FechaFinal) : null;

  //   if (fechaInicial instanceof Date && !isNaN(fechaInicial)) {
  //     formDataToSend.append('FechaInicial', fechaInicial.toISOString().split('T')[0]);
  //   } else {
  //     formDataToSend.append('FechaInicial', '');
  //   }

  //   if (fechaFinal instanceof Date && !isNaN(fechaFinal)) {
  //     formDataToSend.append('FechaFinal', fechaFinal.toISOString().split('T')[0]);
  //   } else {
  //     formDataToSend.append('FechaFinal', '');
  //   }

  //   formDataToSend.append('IdCliente', formData.IdCliente.join(',') || '');

  //   filters(formDataToSend);
  // }, [formData]);

  // const handleChange = (name, value) => {
  //   setFormData(prevState => ({
  //     ...prevState,
  //     [name]: value,  // Actualiza la fecha correspondiente en el estado
  //   }));
  //   console.log(formData)
  // };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   setLoading(true);
  //   Promise.all([
  //     populateClientsData(),
  //     populatePendingsRequestsData(),
  //     populatePendingChecksData(),
  //     populateChecksToBeRefundedData(),
  //     populateChecksReceivableData(),
  //     populateChecksFinished(),
  //     populateRequests(),
  //     populateRequestsEstatus(),
  //     populateChecks(),
  //     populateChecksEstatus()
  //   ]).then(() => setLoading(false));
  // }, []);
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Reportes' },
  ];

  return (
    <Container maxWidth={false} sx={{ padding: '24px' }}>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      {loading ? (
        <Stack spacing={3}>
          <Skeleton variant="rounded" width={'100%'} height={200} />
          <Skeleton variant="rounded" width={'100%'} height={200} />
          <Skeleton variant="rounded" width={'100%'} height={200} />
        </Stack>
      ) : (
        <>
        <Fab
        variant="extended"
        onClick={handleDrawerOpen}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          padding: '8px 40px',
          backgroundColor: "#fff",
          '&:hover': {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        Filtros
      </Fab>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <div>
          <DrawerHeader>
            <Typography variant="h5">Filtros</Typography>
          </DrawerHeader>
          <Divider />
          <Stack
            direction="column"
            spacing={0}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              margin: "20px 0px",
            }}
          >
            <Accordion sx={{ boxShadow: "none", width: "100%" }}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography variant="h6">Fechas</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <DatePicker
                  name="FechaInicial"
                  id='start-date'
                  label='Fecha Inicio'
                  // value={formData.FechaInicio ? dayjs(formData.FechaInicio, 'DD/MM/YYYY') : null}
                  sx={{ width: '100%', marginBottom: 2 }}
                  // onChange={(date) => handleChange('FechaInicial', date)}
                />
                <DatePicker
                  name="FechaFinal"
                  id='end-date'
                  label='Fecha Fin'
                  // value={formData.FechaFin ? dayjs(formData.FechaFin, 'DD/MM/YYYY') : null}
                  sx={{ width: '100%' }}
                  // onChange={(date) => handleChange('FechaFinal', date)}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ boxShadow: "none", borderBottom: "1px solid #E0E0E0", width: "100%" }}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography variant="h6">Estatus</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Autocomplete
                disablePortal
                // options={top100Films}
                renderInput={(params) => <TextField {...params} label="Departamento" />}
                fullWidth
              />
              </AccordionDetails>
            </Accordion>
          </Stack>
        </div>
        <Stack
          direction="column"
          spacing={2}
          sx={{
            justifyContent: "flex-end",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <Button
            onClick={handleDrawerClose}
            color="info"
            variant="outlined"
            sx={{ width: '100%' }}
          >
            Cerrar
          </Button>
        </Stack>
      </Drawer>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 3, md: 2, lg: 3 }}
        sx={{
          justifyContent: { xs: 'center', md: 'space-around' },
          alignItems: { xs: 'center', md: 'flex-start' },
        }}
      >
        <Box
          className="DashboardCard"
          width={{ xs: '100%', md: '18%', lg: '20%' }}
          height={{ xs: 200, md: 180, lg: 160 }}
          sx={{
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatedGauge /*value={pendingRequests.total} valueMax={pendingRequests.totalRegistros}*//>
          {/*valueMax={60}*/}
          <Typography variant={"h7"} sx={{ marginTop: 1, minHeight: 40 }}>
            Incidencias Abiertas
          </Typography>
        </Box>
        <Box
          className="DashboardCard"
          width={{ xs: '100%', md: '18%', lg: '20%' }}
          height={{ xs: 200, md: 180, lg: 160 }}
          sx={{
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatedGauge /*value={pendingChecks.total} valueMax={pendingChecks.totalRegistros}*//>
          <Typography variant="h7" sx={{ marginTop: 1, minHeight: 40 }}>
            Incidencias Urgentes
          </Typography>
        </Box>
        <Box
          className="DashboardCard"
          width={{ xs: '100%', md: '18%', lg: '20%' }}
          height={{ xs: 200, md: 180, lg: 160 }}
          sx={{
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatedGauge /*value={checksToBeRefunded.total} valueMax={checksToBeRefunded.totalRegistros}*//>
          <Typography variant="h7" sx={{ marginTop: 1, minHeight: 40 }}>
            Incidencias Cerradas
          </Typography>
        </Box>
        <Box
          className="DashboardCard"
          width={{ xs: '100%', md: '18%', lg: '20%' }}
          height={{ xs: 200, md: 180, lg: 160 }}
          sx={{
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatedGauge /*value={checksReceivable.total} valueMax={checksReceivable.totalRegistros}*/ />
          <Typography variant="h7" sx={{ marginTop: 1, minHeight: 40 }}>
            Incidencias de Alto Riesgo
          </Typography>
        </Box>
      </Stack>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 3, md: 2, lg: 3 }}
        sx={{
          marginTop: 2,
          justifyContent: { xs: 'center', md: 'space-around' },
          alignItems: { xs: 'center', md: 'flex-start' },
        }}
      >
        <Box
          className="DashboardCard"
          width={{ xs: '100%', md: '60%' }}
          sx={{
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            Tickets
          </Typography>
          <BarChart
            xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
            series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
            height={200}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </Box>
        <Box
          className="DashboardCard"
          width={{ xs: '100%', md: '40%' }}
          sx={{
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            Tickets por estatus
          </Typography>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: 'series A' },
                  { id: 1, value: 15, label: 'series B' },
                  { id: 2, value: 20, label: 'series C' },
                ],
              },
            ]}
            height={200}
          />
        </Box>
      </Stack>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        sx={{
          marginTop: 2,
          justifyContent: { xs: 'center', md: 'space-around' },
          alignItems: { xs: 'center', md: 'flex-start' },
        }}
      >
        <Box
          className="DashboardCard"
          width={{ xs: '100%', md: '40%' }}
          sx={{
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            Colaboradores
          </Typography>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: 'series A' },
                  { id: 1, value: 15, label: 'series B' },
                  { id: 2, value: 20, label: 'series C' },
                ],
              },
            ]}
            height={200}
          />
        </Box>
        <Box
          className="DashboardCard"
          width={{ xs: '100%', md: '60%' }}
          sx={{
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            Citas
          </Typography>
          <BarChart
            xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
            series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
            height={200}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </Box>
      </Stack>
        </>
      )}
    </Container>
  );
}

export default Reports