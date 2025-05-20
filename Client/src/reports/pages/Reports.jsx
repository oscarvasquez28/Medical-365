import {React, useState, useEffect} from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { styled } from '@mui/material/styles';
import AnimatedGauge from '../../common/components/AnimatedGauge';
import Skeleton from '@mui/material/Skeleton';
import CustomBreadcrumb from '../../common/components/CustomBreadcrumb';
import IndicatorsAPI from '../../services/IndicatorsAPI'

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
  const [tickets, setTickets] = useState([]);
  const [ticketsMonth, setTicketsMonth] = useState([]);
  const [appointmentsMonth, setAppointmentsMonth] = useState([]);
  const [collaboratorsStatus, setCollaboratorsStatus] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getTicketsStatus(),
      getTicketsMonth(),
      getAppointmentsMonth(),
      getCollaboratorsStatus(),
    ]).then(() => setLoading(false));
  }, []);

  async function getTicketsStatus() {
    try {
      const { data } = await IndicatorsAPI.getTickets();
      setTickets(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setTickets([]);
    }
  }

  async function getTicketsMonth() {
    try {
      const { data } = await IndicatorsAPI.getTicketsMonth();
      setTicketsMonth(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setTicketsMonth([]);
    }
  }

  async function getAppointmentsMonth() {
    try {
      const { data } = await IndicatorsAPI.getAppointmentsMonth();
      setAppointmentsMonth(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setAppointmentsMonth([]);
    }
  }

    async function getCollaboratorsStatus() {
    try {
      const { data } = await IndicatorsAPI.getCollaboratorsStatus();
      setCollaboratorsStatus(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setCollaboratorsStatus([]);
    }
  }

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
          <AnimatedGauge value={tickets.pendientes?.value ?? 0} valueMax={tickets.totalTickets ?? 0}/>
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
          <AnimatedGauge value={tickets.cerrados?.value ?? 0} valueMax={tickets.totalTickets ?? 0}/>
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
          <AnimatedGauge value={tickets.cancelados?.value ?? 0} valueMax={tickets.totalTickets ?? 0}/>
          <Typography variant="h7" sx={{ marginTop: 1, minHeight: 40 }}>
            Incidencias Canceladas
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
          <AnimatedGauge value={tickets.urgentes?.value ?? 0} valueMax={tickets.totalTickets ?? 0}/>
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
            Tickets por Mes
          </Typography>
          <BarChart
            xAxis={[{ scaleType: 'band', data: ticketsMonth.map(item => item.mes) }]}
            series={[{ data: ticketsMonth.map(item => item.cantidad) }]}
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
            Tickets por Estatus
          </Typography>
          <PieChart
            series={[
              {
                data: [
                  { id: tickets.cerrados?.id ?? 0, value: tickets.cerrados?.value ?? 0, label: tickets.cerrados?.label ?? 'Cerrados' },
                  { id: tickets.pendientes?.id ?? 1, value: tickets.pendientes?.value ?? 0, label: tickets.pendientes?.label ?? 'Pendientes' },
                  { id: tickets.cancelados?.id ?? 2, value: tickets.cancelados?.value ?? 0, label: tickets.cancelados?.label ?? 'Cancelados' },
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
            Colaboradores por Estatus
          </Typography>
          <PieChart
            series={[
              {
                data: [
                  { id: collaboratorsStatus.activo?.id ?? 0, value: collaboratorsStatus.activo?.value ?? 0, label: collaboratorsStatus.activo?.label ?? 'Activo' },
                  { id: collaboratorsStatus.inactivo?.id ?? 1, value: collaboratorsStatus.inactivo?.value ?? 0, label: collaboratorsStatus.inactivo?.label ?? 'Inactivo' },
                  { id: collaboratorsStatus.suspendido?.id ?? 2, value: collaboratorsStatus.suspendido?.value ?? 0, label: collaboratorsStatus.suspendido?.label ?? 'Suspendido' },
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
            Citas por Mes
          </Typography>
          <BarChart
            xAxis={[{ scaleType: 'band', data: appointmentsMonth.map(item => item.mes) }]}
            series={[{ data: appointmentsMonth.map(item => item.cantidad) }]}
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