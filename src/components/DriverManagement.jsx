import React, { useState } from 'react';
import { Search, Database, Server, X, Activity, Cloud, Layers, Settings, Grid, BarChart, CreditCard, TrendingUp, Smartphone, Globe, Building2, Zap, Users, ArrowRightLeft, Banknote, Shield, ChevronDown } from 'lucide-react';

const SystemManagement = () => {
  const [currentModule, setCurrentModule] = useState('drivers');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDriver, setExpandedDriver] = useState(null);
  const [activeTab, setActiveTab] = useState('cao');
  const [transactionSearchTerm, setTransactionSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' o 'compact'

  // Datos de los drivers del CAO
  const driversCao = [
    { id: 1, name: 'OFICIAL', trabajos: 'OFICIAL', subsistema: 'CASBS', puertoLocal: '7704', puertoRemoto: '----', ip: '10.100.2.4', icon: <Database /> },
    { id: 2, name: 'ONLINE-COLAS', subsistema: 'CASBS', puertoLocal: '7706', puertoRemoto: '----', ip: '10.100.2.4', subDrivers: [{ trabajos: 'ONLINECOLA' }, { trabajos: 'ONLINESE1' }, { trabajos: 'ONLINESE2' }, { trabajos: 'ONLINESE3' }], icon: <Cloud /> },
    { id: 3, name: 'RECARGA', trabajos: 'ONLRECARGA', subsistema: 'CASBS', puertoLocal: '7716', puertoRemoto: '----', ip: '10.100.2.4', icon: <Activity /> },
    { id: 4, name: 'ONLINE MASIVO', trabajos: 'ONLINEMAS', subsistema: 'CASBS', puertoLocal: '7709', puertoRemoto: '----', ip: '10.100.2.4', icon: <Grid /> },
    { id: 5, name: 'TRANSACCIONAL', subsistema: 'CASBS', puertoLocal: '7900', puertoRemoto: '----', ip: '10.100.2.4', subDrivers: [{ trabajos: 'CAOTRX' }, { trabajos: 'CAOTRXSE1' }, { trabajos: 'CAOTRX800' }], icon: <BarChart /> },
    { id: 6, name: 'DRIVER SEGURIDAD - NSP ATALLA', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '7000', subDrivers: [{ trabajos: 'NSPATALLA', ip: '10.13.20.10 UIO 1' }, { trabajos: 'NSP800', ip: '10.13.20.11 UIO 2' }, { trabajos: '-------', ip: '10.10.4.181 GYE' }], icon: <Settings /> },
    { id: 7, name: 'DATAFAST VISA', subsistema: 'CASBS', puertoLocal: '7701', puertoRemoto: '----', ip: '192.168.61.2', subDrivers: [{ trabajos: 'DATVISA' }, { trabajos: 'DATVISA800' }, { trabajos: 'DATVISSE1' }, { trabajos: 'DATVISSE2' }, { trabajos: 'DATVISSE3' }], icon: <Cloud /> },
    { id: 8, name: 'DATAFAST DINERS', subsistema: 'CASBS', puertoLocal: '7702', puertoRemoto: '----', ip: '192.168.61.2', subDrivers: [{ trabajos: 'DATDINER' }, { trabajos: 'DATDINERTI' }, { trabajos: 'DATDINER800' }], icon: <Cloud /> },
    { id: 9, name: 'VISA EMISIÓN', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '10100', subDrivers: [{ trabajos: 'VISE' }, { trabajos: 'VISE800' }], icon: <Activity /> },
    { id: 10, name: 'VISA ADQUIRENCIA', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '10101', subDrivers: [{ trabajos: 'VISA' }, { trabajos: 'VISA800' }], icon: <Activity /> },
    { id: 11, name: 'DCI', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '3083', subDrivers: [{ trabajos: 'DCI' }, { trabajos: 'DCICASE1' }, { trabajos: 'DCIINTER1' }, { trabajos: 'DCIREENVIO' }, { trabajos: 'DCI800' }, { trabajos: 'DCIVTXINTE' }], icon: <Server /> },
    { id: 12, name: 'DCI2', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '3083', subDrivers: [{ trabajos: 'DC2' }, { trabajos: 'DC2800' }], icon: <Server /> },
    { id: 13, name: 'MCI', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '6083', subDrivers: [{ trabajos: 'MASTER' }, { trabajos: 'MASTER800' }], icon: <Database /> },
    { id: 14, name: 'MDS', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '6086', subDrivers: [{ trabajos: 'CAOMDS' }, { trabajos: 'CAOMDS800' }], icon: <Database /> },
    { id: 15, name: 'BANRED', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '2015', subDrivers: [{ trabajos: 'BANRED' }, { trabajos: 'BANRED800' }], icon: <Layers /> },
    { id: 16, name: 'BANRED-B24', subsistema: 'CASBS', puertoLocal: '7793', puertoRemoto: '----', subDrivers: [{ trabajos: 'CAOB24' }, { trabajos: 'CAOB24800' }], icon: <Layers /> },
    { id: 17, name: 'BANRED-B25', subsistema: 'CASBS', puertoLocal: '7795', puertoRemoto: '----', subDrivers: [{ trabajos: 'CAOB25' }, { trabajos: 'CAOB25800' }], icon: <Layers /> },
    { id: 18, name: 'BANCO PICHINCHA (EFECTIVO EXPRESS)', subsistema: 'CASBS', puertoLocal: '7715', puertoRemoto: '----', ip: '192.168.77.113', subDrivers: [{ trabajos: 'CAOPICH' }, { trabajos: 'CAOPICH800' }], icon: <Grid /> },
    { id: 19, name: 'PULSE', subsistema: 'CASBS', puertoLocal: '4198', puertoRemoto: '----', ip: '199.38.157.104', subDrivers: [{ trabajos: 'CAOPUL' }, { trabajos: 'CAOPUL800' }], icon: <Activity /> },
    { id: 20, name: 'ATM DINERS', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '8109', ip: '10.100.176.223', subDrivers: [{ trabajos: 'DATBRK' }, { trabajos: 'DATBRK800' }], icon: <Grid /> },
    { id: 21, name: 'BROKER (TRANSFERENCIAS INTERBANCARIAS)', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '9001', ip: '10.100.176.223', subDrivers: [{ trabajos: 'CAOBRO' }, { trabajos: 'CAOBRO800' }], icon: <Grid /> },
    { id: 22, name: 'DOCK', subsistema: 'BANREDSBS', puertoLocal: '----', puertoRemoto: '10185', ip: '10.19.225.10', subDrivers: [{ trabajos: 'CAODCK' }, { trabajos: 'CAODCK800' }], icon: <Layers /> },
    { id: 23, name: 'MÓDULO GRÁFICO', subsistema: 'QINTER', puertoLocal: '52000', puertoRemoto: '----', ip: '----', subDrivers: [{ trabajos: 'LISTEN2550' }, { trabajos: 'LISTEN721' }], icon: <BarChart /> },
    { id: 24, name: 'TRABAJO DE DEPURACIÓN', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '----', ip: 'Op. DEPURCION ARCHIVOS TEMPORALES', subDrivers: [{ trabajos: 'CAODEPURA' }], icon: <Settings /> },
    { id: 25, name: 'BPC-BP', subsistema: 'CASBS', puertoLocal: '7723', puertoRemoto: '----', ip: '10.14.64.11 o 10.14.64.12', subDrivers: [{ trabajos: 'CAOBPC' }, { trabajos: 'CAOBPC800' }], icon: <Settings /> },
    { id: 26, name: 'JARDIN AZUAYO', subsistema: 'CASBS', puertoLocal: '7765', puertoRemoto: '----', ip: '10.100.2.21', subDrivers: [{ trabajos: 'CAOJAR' }, { trabajos: 'CAOJAR800' }], icon: <Grid /> },
    { id: 27, name: 'VTEX', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '10102', ip: 'VALIDAR LA IP Y LA PARAMETRIZACIÓN', subDrivers: [{ trabajos: 'VTEXVIPSE1' }, { trabajos: 'VTEXVIPSE2' }, { trabajos: 'VTEXVIPSE3' }, { trabajos: 'VTEXVIPSE4' }, { trabajos: 'VTEXVIPSE5' }, { trabajos: 'VTEXVIPSE6' }, { trabajos: 'VTEXVIPSE7' }, { trabajos: 'VTEXVIPSE8' }, { trabajos: 'VTEXVIPSE9' }, { trabajos: 'VTEX800' }, { trabajos: 'VTEXINTER' }], icon: <Activity /> }
  ];

  // Datos de los drivers del Gestor
  const driversGestor = [
    { id: 101, name: 'OFICIAL', subsistema: 'ASEB10SBS', puertoLocal: '----', puertoRemoto: '7704', ip: '10.100.2.21', icon: <Settings />, subDrivers: [
      { trabajos: 'ASGOFIADM' },
      { trabajos: 'ASGOFIADM2' },
      { trabajos: 'CAOFIASG' }
    ]},
    { id: 102, name: 'ONLINE COLAS', subsistema: 'ASEB10SBS', puertoLocal: '----', puertoRemoto: '7706', ip: '10.100.2.21', icon: <Cloud />, subDrivers: [
      { trabajos: 'ASGONLCOLA' },
      { trabajos: 'ASGONLSE1' },
      { trabajos: 'ASGONLSE2' },
      { trabajos: 'ASGONLSE3' }
    ]},
    { id: 103, name: 'RECARGA', subsistema: 'ASEB10SBS', puertoLocal: '----', puertoRemoto: '7716', ip: '10.100.2.21', icon: <Activity />, subDrivers: [
      { trabajos: 'ASGONLIREC' },
      { trabajos: 'SMSANULAUT' }
    ]},
    { id: 104, name: 'ONLINE MASIVO', subsistema: 'ASEB10SBS', puertoLocal: '----', puertoRemoto: '7709', ip: '10.100.2.21', icon: <Grid />, subDrivers: [
      { trabajos: 'CAOONLINEMX' }
    ]},
    { id: 105, name: 'TRANSACCIONAL', subsistema: 'ASEB10SBS', puertoLocal: '----', puertoRemoto: '7900', ip: '10.100.2.21', icon: <BarChart />, subDrivers: [
      { trabajos: 'DATGESR1' },
      { trabajos: 'DATGESATRX' }
    ]},
    { id: 106, name: 'DRIVER SEGURIDAD', subsistema: 'ASEB10SBS', puertoLocal: '----', puertoRemoto: '7000', ip: '10.13.20.10', icon: <Settings />, subDrivers: [
      { trabajos: 'MNTATALLA' },
      { trabajos: 'NSPATALLA' }
    ]},
    { id: 107, name: 'MUNICIPIO DE GUAYAQUIL', subsistema: 'ASEB10SBS', puertoLocal: '----', puertoRemoto: '2513', ip: '172.20.20.200', icon: <Grid />, subDrivers: [
      { trabajos: 'GESBAN' },
      { trabajos: 'GESBANSE1' }
    ]},
    { id: 108, name: 'DATACREDITO', subsistema: 'ASEB10SBS', puertoLocal: '----', puertoRemoto: '8600', ip: '192.168.29.150', icon: <Database />, subDrivers: [
      { trabajos: 'DATCREDI1' },
      { trabajos: 'DATCREDI2' },
      { trabajos: 'DATCRT01' }
    ]},
    { id: 109, name: 'GESTOR- BROKER (TOKENIZACIÓN)', subsistema: 'ASEB10SBS', puertoLocal: '----', puertoRemoto: '9001', ip: '10.100.176.223', icon: <Activity />, subDrivers: [
      { trabajos: 'BRKRB001' },
      { trabajos: 'BRKRB002' },
      { trabajos: 'BRKRB004' }
    ]},
    { id: 110, name: 'TRIGGER', subsistema: 'ASEB10SBS', puertoLocal: '----', puertoRemoto: '----', ip: '----', icon: <Activity />, subDrivers: [
      { trabajos: 'TRCVGESDTA' },
      { trabajos: 'TSNDGESDTA' }
    ]},
    { id: 111, name: 'WRKJOBSCDE', subsistema: 'QINTER', puertoLocal: '52000/60001/53000/51000/62000/63000/64000', puertoRemoto: '----', ip: '----', icon: <BarChart />, subDrivers: [
      { trabajos: 'LISTEN2' },
      { trabajos: 'LISTEN610' },
      { trabajos: 'PLEXLISOND' },
      { trabajos: 'PLEXLISTEN' },
      { trabajos: 'PLEXLIS610' },
      { trabajos: 'PLEXLIS72A' },
      { trabajos: 'PLEXLIS72B' }
    ]},
    { id: 112, name: 'SMSLISTEN', subsistema: 'QSMSSBS', puertoLocal: '24001', puertoRemoto: '----', ip: '----', icon: <Activity />},
    { id: 113, name: 'CIERRE DE OPERACIONES', subsistema: 'ASEB10SBS', puertoLocal: '----', puertoRemoto: '----', ip: '10.100.2.4', icon: <Database />, subDrivers: [
      { trabajos: 'ASGCIEADM' },
      { trabajos: '(5 TRABAJOS' }
    ]},
    { id: 114, name: 'IMPRESIÓN TARJETAS DE DEBITO DOCK', subsistema: 'ASEB10SBS', puertoLocal: '----', puertoRemoto: '----', ip: '10.100.2.4', icon: <Grid />, subDrivers: [
      { trabajos: 'DTARB001' }
    ]}
  ];

  // Datos de transacciones completos
  const transactions = [
    {
      id: 1,
      entidadSistema: 'DCI',
      red: 'AJENA',
      subred: 'GENERAL',
      entidadTipo: 'DC',
      marca: '-',
      centroResolutor: '',
      kpis: ['KPI - DCI - Transacciones aprobadas', 'KPI - DCI - Transacciones rechazadas'],
      descripcion: 'Transacciones que vienen de fuera, para Diners y Discover',
      search: 'dci dc diners discover transacciones aprobadas rechazadas ajena',
      type: 'ajenas',
      color: 'red'
    },
    {
      id: 2,
      entidadSistema: 'DCI',
      red: 'PROPIAS',
      subred: 'GENERAL',
      entidadTipo: 'IN',
      marca: 'DN',
      centroResolutor: '',
      kpis: ['Transacciones capturadas y enviadas'],
      descripcion: 'Transacciones que nosotros capturamos y enviamos',
      search: 'dci in dn diners discover propias capturadas enviamos',
      type: 'propias',
      color: 'blue'
    },
    {
      id: 3,
      entidadSistema: 'Datafast Diners/Discover',
      red: 'PROPIAS',
      subred: 'POS',
      entidadTipo: 'DC',
      marca: '-',
      centroResolutor: '',
      kpis: ['KPI - DataFast - Diners - Transacciones aprobadas', 'KPI - DataFast - Diners - Transacciones rechazadas', 'KPI - DataFast - Discover - Transacciones aprobadas', 'KPI - DataFast - Discover - Transacciones rechazadas'],
      descripcion: 'Transacciones para Diners y Discover a través de POS',
      search: 'datafast diners discover dc pos transacciones aprobadas rechazadas',
      type: 'propias pos',
      color: 'green'
    },
    {
      id: 4,
      entidadSistema: 'Datafast Visa/Mastercard',
      red: 'PROPIAS',
      subred: 'POS',
      entidadTipo: 'PI',
      marca: '-',
      centroResolutor: '',
      kpis: ['KPI - DataFast - VISA - Transacciones aprobadas', 'KPI - DataFast - VISA - Transacciones rechazadas', 'KPI - DataFast - Master Card - Transacciones aprobadas', 'KPI - DataFast - Master Card - Transacciones rechazadas'],
      descripcion: 'Transacciones para Visa y Mastercard a través de POS',
      search: 'datafast visa mastercard pi pos transacciones aprobadas rechazadas',
      type: 'propias pos',
      color: 'green'
    },
    {
      id: 5,
      entidadSistema: 'Visa Internacional',
      red: 'AJENA',
      subred: 'GENERAL',
      entidadTipo: 'PI',
      marca: 'VI',
      centroResolutor: '',
      kpis: ['KPI - VAP - Transacciones aprobadas', 'KPI - VAP - Transacciones rechazadas'],
      descripcion: 'Transacciones que vienen de fuera',
      search: 'visa internacional pi vi vap transacciones aprobadas rechazadas ajena',
      type: 'ajenas',
      color: 'red'
    },
    {
      id: 6,
      entidadSistema: 'Visa Internacional',
      red: 'PROPIAS',
      subred: 'GENERAL',
      entidadTipo: 'IN',
      marca: 'VI',
      centroResolutor: '',
      kpis: ['Transacciones capturadas y enviadas'],
      descripcion: 'Transacciones que nosotros capturamos y enviamos',
      search: 'visa internacional in vi propias capturadas enviamos',
      type: 'propias',
      color: 'blue'
    },
    {
      id: 7,
      entidadSistema: 'MasterCard Internacional',
      red: 'AJENA',
      subred: 'GENERAL',
      entidadTipo: 'PI',
      marca: 'MC',
      centroResolutor: '',
      kpis: ['KPI - MCI - Transacciones aprobadas', 'KPI - MCI - Transacciones rechazadas'],
      descripcion: 'Transacciones que vienen de fuera a través de MasterCard',
      search: 'mastercard internacional pi mc mci transacciones aprobadas rechazadas ajena',
      type: 'ajenas',
      color: 'red'
    },
    {
      id: 8,
      entidadSistema: 'MasterCard Internacional',
      red: 'PROPIAS',
      subred: 'GENERAL',
      entidadTipo: 'IN',
      marca: 'MC',
      centroResolutor: '',
      kpis: ['Transacciones capturadas y enviadas'],
      descripcion: 'Transacciones que nosotros capturamos y enviamos a MasterCard',
      search: 'mastercard internacional in mc propias capturadas enviamos',
      type: 'propias',
      color: 'blue'
    },
    {
      id: 9,
      entidadSistema: 'MasterCard MDS',
      red: 'PROPIAS',
      subred: 'ATM',
      entidadTipo: 'IN',
      marca: 'MC',
      centroResolutor: '',
      kpis: ['KPI - MCI MDS - Transacciones aprobadas', 'KPI - MCI MDS - Transacciones rechazadas'],
      descripcion: 'Transacciones con tarjetas ajenas MasterCard en cajeros nuestros',
      search: 'mastercard mds in mc atm cajeros mci transacciones aprobadas rechazadas',
      type: 'propias atm',
      color: 'indigo'
    },
    {
      id: 10,
      entidadSistema: 'Botón de pagos Placetopay',
      red: 'PROPIAS',
      subred: 'INTERNET',
      entidadTipo: '',
      marca: 'PlacetoPay',
      centroResolutor: 'PlacetoPay',
      kpis: ['KPI - Nuevo Botón de Pagos PTP - Transacciones anuladas', 'KPI - Nuevo Botón de Pagos PTP - Transacciones aprobadas', 'KPI - Nuevo Botón de Pagos PTP - Transacciones rechazadas', 'KPI - Nuevo Botón de Pagos PTP - Transacciones totales'],
      descripcion: 'Transacciones que se realizan en el botón de pagos a través de Placetopay',
      search: 'placetopay ptp boton pagos internet transacciones aprobadas rechazadas anuladas totales',
      type: 'propias internet',
      color: 'purple'
    },
    {
      id: 11,
      entidadSistema: 'Botón de pagos Datafast',
      red: 'PROPIAS',
      subred: 'INTERNET',
      entidadTipo: '',
      marca: 'Datafast',
      centroResolutor: 'Datafast',
      kpis: ['Transacciones botón de pagos'],
      descripcion: 'Transacciones que se realizan en el botón de pagos a través de Datafast',
      search: 'datafast boton pagos internet transacciones',
      type: 'propias internet',
      color: 'purple'
    },
    {
      id: 12,
      entidadSistema: 'Nuevo Botón de pagos (Interdin)',
      red: 'PROPIAS',
      subred: 'INTERNET',
      entidadTipo: '',
      marca: 'Botón Pagos',
      centroResolutor: 'Botón Pagos',
      kpis: ['KPI - Nuevo Boton de pagos - MPI', 'KPI - Nuevo Botón de Pagos - Transacciones anuladas', 'KPI - Nuevo Botón de Pagos - Transacciones aprobadas', 'KPI - Nuevo Botón de Pagos - Transacciones negadas', 'KPI - Nuevo Botón de Pagos - Transacciones totales', 'KPI - Nuevo Boton de pagos - VPOS'],
      descripcion: 'Transacciones que se realizan en el botón de pagos a través del Botón de Interdin',
      search: 'interdin boton pagos mpi vpos internet transacciones aprobadas negadas anuladas totales',
      type: 'propias internet',
      color: 'purple'
    },
    {
      id: 13,
      entidadSistema: 'Efectivo Express',
      red: 'PROPIAS',
      subred: 'BANCO PICHINCHA',
      entidadTipo: '',
      marca: 'Pichincha',
      centroResolutor: 'Pichincha',
      kpis: ['KPI - Pichincha - Diners - Transacciones aprobadas', 'KPI - Pichincha - Diners - Transacciones rechazadas', 'KPI - Pichincha - Mastercard - Transacciones aprobadas', 'KPI - Pichincha - Mastercard - Transacciones rechazadas', 'KPI - Pichincha - Visa - Transacciones aprobadas', 'KPI - Pichincha - Visa - Transacciones rechazadas'],
      descripcion: 'Transacciones que se realizan a través de ventanilla del Banco Pichincha (Efectivo Express y Pago de Universidades)',
      search: 'efectivo express pichincha banco ventanilla diners mastercard visa universidades',
      type: 'propias banco',
      color: 'orange'
    },
    {
      id: 14,
      entidadSistema: 'SMS',
      red: 'PROPIAS',
      subred: 'SMS',
      entidadTipo: '',
      marca: '',
      centroResolutor: '',
      kpis: ['KPI - SMS CAO - Transacciones aprobadas', 'KPI - SMS CAO - Transacciones rechazadas'],
      descripcion: 'Compra de minutos a través de SMS',
      search: 'sms cao minutos transacciones aprobadas rechazadas',
      type: 'propias sms',
      color: 'teal'
    },
    {
      id: 15,
      entidadSistema: 'Discover (Pulse)',
      red: 'PROPIAS',
      subred: 'ATM',
      entidadTipo: 'IN',
      marca: 'DN',
      centroResolutor: '',
      kpis: ['KPI - PULSE ATM - Transacciones aprobadas', 'KPI - PULSE ATM - Transacciones rechazadas'],
      descripcion: 'Transacciones con tarjetas ajenas en cajeros nuestros',
      search: 'discover pulse in dn atm cajeros transacciones aprobadas rechazadas',
      type: 'propias atm',
      color: 'indigo'
    },
    {
      id: 16,
      entidadSistema: 'Banred',
      red: 'PROPIAS',
      subred: 'ATM',
      entidadTipo: '',
      marca: 'Banred',
      centroResolutor: 'Banred',
      kpis: ['KPI - BANRED - Transacciones aprobadas', 'KPI - BANRED - Transacciones rechazadas'],
      descripcion: 'Transacciones ATM que se realizan en cajeros que no son nuestros (Pago de tarjetas de crédito propias y transferencias interbancarias en tiempo real)',
      search: 'banred atm cajeros transacciones aprobadas rechazadas pago transferencias',
      type: 'propias atm',
      color: 'indigo'
    },
    {
      id: 17,
      entidadSistema: 'Banred B-25',
      red: 'PROPIAS',
      subred: 'BANCO PICHINCHA',
      entidadTipo: '',
      marca: 'B24',
      centroResolutor: 'B24',
      kpis: ['KPI - Banred B25 - ATM - Transacciones aprobadas', 'KPI - Banred B25 - ATM - Transacciones rechazadas'],
      descripcion: 'Transacciones con tarjetas de crédito que vienen de Banco Pichincha a través de B25 (efectivo express, pago de universidades, crédito preciso)',
      search: 'banred b25 b24 pichincha efectivo express universidades credito',
      type: 'propias banco',
      color: 'orange'
    },
    {
      id: 18,
      entidadSistema: 'Banred B-25',
      red: 'PROPIAS',
      subred: 'ATM',
      entidadTipo: '',
      marca: 'B24',
      centroResolutor: 'B24',
      kpis: ['KPI - Banred B25 - PICHINCHA - Transacciones aprobadas', 'KPI - Banred B25 - PICHINCHA - Transacciones rechazadas'],
      descripcion: 'Transacciones con tarjetas de crédito que vienen a través de nuestros cajeros (avances de efectivo)',
      search: 'banred b25 pichincha atm cajeros avances efectivo',
      type: 'propias atm',
      color: 'indigo'
    },
    {
      id: 19,
      entidadSistema: 'Banred B-24',
      red: '',
      subred: '',
      entidadTipo: '',
      marca: '',
      centroResolutor: 'Banco Pichincha',
      kpis: ['KPI - Banred B24 - Transacciones aprobadas', 'KPI - Banred B24 - Transacciones rechazadas'],
      descripcion: 'Transacciones con tarjetas de débito (consumos locales, avances y consumos en el exterior). Solo transacciones de débito de Banco Pichincha',
      search: 'banred b24 debito consumos avances exterior pichincha',
      type: 'propias',
      color: 'gray'
    },
    {
      id: 20,
      entidadSistema: 'Cash Advance y Donaciones (Multicanalidad Web y Mobile)',
      red: 'PROPIAS',
      subred: 'INTERNET',
      entidadTipo: '',
      marca: 'Technisys',
      centroResolutor: 'Technisys',
      kpis: ['Cálculo Tipo de Crédito', 'Intereses', 'OTP', 'Autorizaciones'],
      descripcion: 'Transacciones monetarias desde el portal y app multicanalidad para Cash Advance y Donaciones. Technisys consume los 4 servicios',
      search: 'cash advance donaciones technisys multicanalidad web mobile portal app',
      type: 'propias internet',
      color: 'purple'
    },
    {
      id: 21,
      entidadSistema: 'Dock',
      red: '',
      subred: '',
      entidadTipo: '',
      marca: '',
      centroResolutor: 'Banco Diners Club del Ecuador',
      kpis: ['KPI - DOCK - Transacciones aprobadas', 'KPI - DOCK - Transacciones rechazadas'],
      descripcion: 'Consulta de saldos, avances de efectivo, cambio de PIN y anulaciones. Transaccionalidad con tarjetas de DÉBITO BANCO DINERS CLUB DEL ECUADOR',
      search: 'dock diners club debito saldos avances pin anulaciones',
      type: 'propias atm',
      color: 'indigo'
    },
    {
      id: 22,
      entidadSistema: 'BPC - BP',
      red: '',
      subred: '',
      entidadTipo: '',
      marca: '',
      centroResolutor: 'Ca BPC',
      kpis: ['KPI - BPC - Transacciones aprobadas', 'KPI - BPC - Transacciones rechazadas'],
      descripcion: 'Transacciones Tarjeta Prepago Transporte Banco Pichincha a través de BPC - BP',
      search: 'bpc bp prepago transporte pichincha',
      type: 'propias',
      color: 'gray'
    },
    {
      id: 23,
      entidadSistema: 'Jardín Azuayo',
      red: '',
      subred: '',
      entidadTipo: '',
      marca: '',
      centroResolutor: 'Ca Jardín Azuayo',
      kpis: ['KPI - Jardín Azuayo - Transacciones aprobadas', 'KPI - Jardín Azuayo - Transacciones rechazadas'],
      descripcion: 'Transacciones aprobadas y rechazadas con tarjeta débito Coop. Jardin Azuayo, su centro autorizador JARDIN AZUAYO',
      search: 'jardin azuayo cooperativa debito centro autorizador',
      type: 'propias',
      color: 'emerald'
    }
  ];

  // Obtener drivers activos
  const activeDrivers = activeTab === 'cao' ? driversCao : driversGestor;

  // Filtrar drivers
  const filteredDrivers = activeDrivers.filter(driver => {
    if (driver.name.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    if (driver.trabajos && driver.trabajos.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    if (driver.subDrivers) {
      return driver.subDrivers.some(subDriver => 
        subDriver.trabajos.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return false;
  });

  // Filtrar transacciones
  const filteredTransactions = transactions.filter(transaction => {
    let matchesFilter = false;
    
    if (currentFilter === 'all') {
      matchesFilter = true;
    } else if (currentFilter === 'propias') {
      matchesFilter = transaction.red === 'PROPIAS';
    } else if (currentFilter === 'ajenas') {
      matchesFilter = transaction.red === 'AJENA';
    } else {
      matchesFilter = transaction.type.includes(currentFilter);
    }
    
    const matchesSearch = !transactionSearchTerm || 
      transaction.search.toLowerCase().includes(transactionSearchTerm.toLowerCase()) ||
      transaction.entidadSistema.toLowerCase().includes(transactionSearchTerm.toLowerCase()) ||
      transaction.entidadTipo.toLowerCase().includes(transactionSearchTerm.toLowerCase()) ||
      transaction.marca.toLowerCase().includes(transactionSearchTerm.toLowerCase()) ||
      transaction.centroResolutor.toLowerCase().includes(transactionSearchTerm.toLowerCase()) ||
      transaction.kpis.join(' ').toLowerCase().includes(transactionSearchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const toggleDriver = (driverId) => {
    setExpandedDriver(expandedDriver === driverId ? null : driverId);
  };

  // Función para obtener el color del sistema
  const getSystemColorClasses = (color) => {
    switch (color) {
      case 'red': return 'bg-red-100 border-red-300 text-red-800';
      case 'blue': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'green': return 'bg-green-100 border-green-300 text-green-800';
      case 'purple': return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'teal': return 'bg-teal-100 border-teal-300 text-teal-800';
      case 'indigo': return 'bg-indigo-100 border-indigo-300 text-indigo-800';
      case 'orange': return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'emerald': return 'bg-emerald-100 border-emerald-300 text-emerald-800';
      case 'gray': return 'bg-gray-100 border-gray-300 text-gray-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getSystemIcon = (sistema) => {
    if (sistema.includes('DCI')) return <Shield className="w-5 h-5" />;
    if (sistema.includes('Visa')) return <CreditCard className="w-5 h-5" />;
    if (sistema.includes('MasterCard')) return <CreditCard className="w-5 h-5" />;
    if (sistema.includes('Datafast')) return <Zap className="w-5 h-5" />;
    if (sistema.includes('Placetopay')) return <Globe className="w-5 h-5" />;
    if (sistema.includes('SMS')) return <Smartphone className="w-5 h-5" />;
    if (sistema.includes('Banred')) return <ArrowRightLeft className="w-5 h-5" />;
    if (sistema.includes('Efectivo Express')) return <Building2 className="w-5 h-5" />;
    if (sistema.includes('Discover')) return <CreditCard className="w-5 h-5" />;
    if (sistema.includes('Cash Advance')) return <Banknote className="w-5 h-5" />;
    if (sistema.includes('Dock')) return <Server className="w-5 h-5" />;
    if (sistema.includes('BPC')) return <CreditCard className="w-5 h-5" />;
    if (sistema.includes('Jardín')) return <Users className="w-5 h-5" />;
    return <Activity className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header principal */}
      <div className={`${
        currentModule === 'drivers' 
          ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800'
          : 'bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800'
      } text-white p-4 shadow-lg`}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold flex items-center">
            {currentModule === 'drivers' ? (
              <>
                <Server className="mr-2 h-7 w-7" />
                Gestión de Drivers
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-7 w-7" />
                Consulta de Transacciones
              </>
            )}
          </h1>
          <p className={`${
            currentModule === 'drivers' ? 'text-blue-100' : 'text-purple-100'
          } text-sm`}>
            {currentModule === 'drivers' 
              ? 'Sistema de administración de drivers CAO y Gestor'
              : 'Clasificación mejorada por categorías y tipos de canal'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Navegación entre módulos */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex space-x-1">
            <button 
              onClick={() => setCurrentModule('drivers')} 
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                currentModule === 'drivers'
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center">
                <Server className="w-4 h-4 mr-1" />
                Gestión de Drivers
              </div>
            </button>
            <button 
              onClick={() => setCurrentModule('transactions')} 
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                currentModule === 'transactions'
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center">
                <CreditCard className="w-4 h-4 mr-1" />
                Consulta de Transacciones
              </div>
            </button>
          </div>
        </div>

        {/* Módulo de Drivers */}
        {currentModule === 'drivers' && (
          <>
            {/* Controles de Drivers */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-1 mb-4 sm:mb-0">
                  <button 
                    onClick={() => setActiveTab('cao')} 
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'cao' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <Server className="w-4 h-4 mr-1" />
                      Drivers CAO
                      <span className="ml-2 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                        {driversCao.length}
                      </span>
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveTab('gestor')} 
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'gestor' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <Settings className="w-4 h-4 mr-1" />
                      Drivers Gestor
                      <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                        {driversGestor.length}
                      </span>
                    </div>
                  </button>
                </div>
                
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder={`Buscar driver o trabajo ${activeTab === 'cao' ? 'CAO' : 'Gestor'}...`}
                    className="w-full pl-9 pr-4 py-2 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Contador y etiquetas */}
            <div className="flex justify-between items-center mb-4 px-1">
              <div className="text-sm text-gray-600 font-medium">
                {activeTab === 'cao' ? 'Drivers CAO' : 'Drivers Gestor'}
                <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                  {filteredDrivers.length} mostrados
                </span>
              </div>
              <div className="flex space-x-2">
                <span className="inline-flex items-center text-xs bg-green-50 border border-green-200 text-green-700 px-2 py-1 rounded-md">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>Puerto Local
                </span>
                <span className="inline-flex items-center text-xs bg-yellow-50 border border-yellow-200 text-yellow-700 px-2 py-1 rounded-md">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>Puerto Remoto
                </span>
              </div>
            </div>

            {/* Grid de Drivers */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {filteredDrivers.map((driver) => (
                <div key={driver.id} className="relative">
                  <button
                    onClick={() => toggleDriver(driver.id)}
                    className={`w-full h-20 flex flex-col items-center justify-center rounded-lg shadow-sm border transition-all ${
                      expandedDriver === driver.id 
                        ? activeTab === 'cao' ? 'bg-blue-600 text-white border-blue-700' : 'bg-green-600 text-white border-green-700'
                        : 'bg-white hover:bg-blue-50 border-gray-200'
                    }`}
                  >
                    <div className="absolute top-0 left-0 right-0 flex justify-center -mt-2">
                      {driver.puertoLocal && driver.puertoLocal !== '----' && (
                        <span className="text-xs font-mono px-1.5 py-0.5 rounded-full mx-0.5 bg-green-100 text-green-700 border border-green-300">
                          L:{driver.puertoLocal}
                        </span>
                      )}
                      {driver.puertoRemoto && driver.puertoRemoto !== '----' && (
                        <span className="text-xs font-mono px-1.5 py-0.5 rounded-full mx-0.5 bg-yellow-100 text-yellow-700 border border-yellow-300">
                          R:{driver.puertoRemoto}
                        </span>
                      )}
                    </div>

                    <div className="mt-1">
                      <div className={`h-5 w-5 ${expandedDriver === driver.id ? 'text-white' : 'text-blue-500'}`}>
                        {driver.icon || <Database />}
                      </div>
                    </div>
                    
                    <div className="px-1 mt-1 text-center">
                      <h3 className="text-xs font-medium leading-tight truncate max-w-full">{driver.name}</h3>
                      <p className={`text-xs mt-0.5 ${expandedDriver === driver.id ? 'text-blue-200' : 'text-gray-500'}`}>
                        {driver.subDrivers ? `${driver.subDrivers.length} trabajos` : "1 trabajo"}
                      </p>
                    </div>
                  </button>

                  {/* Modal */}
                  {expandedDriver === driver.id && (
                    <>
                      <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-10"
                        onClick={() => setExpandedDriver(null)}
                      ></div>
                      
                      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl z-20 w-11/12 max-w-4xl max-h-[80vh] overflow-auto">
                        <div className={`sticky top-0 ${activeTab === 'cao' ? 'bg-blue-600' : 'bg-green-600'} text-white px-4 py-3 flex justify-between items-center`}>
                          <div className="flex items-start">
                            <div className="mr-3 mt-1">
                              {driver.icon || <Database className="h-5 w-5" />}
                            </div>
                            <div>
                              <h2 className="text-lg font-bold">{driver.name}</h2>
                              <p className="text-xs text-blue-100">{driver.subsistema} - {driver.subDrivers ? `${driver.subDrivers.length} trabajos` : "1 trabajo"}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => setExpandedDriver(null)}
                            className="p-1 rounded-full hover:bg-opacity-20 hover:bg-black transition-colors"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                        
                        <div className="p-4">
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead>
                                <tr>
                                  <th className="px-3 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trabajos</th>
                                  <th className="px-3 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subsistema</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {driver.subDrivers ? (
                                  driver.subDrivers.map((subDriver, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                      <td className="px-3 py-2 text-sm text-gray-900 font-mono">{subDriver.trabajos}</td>
                                      <td className="px-3 py-2 text-sm text-gray-600">{driver.subsistema}</td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td className="px-3 py-2 text-sm text-gray-900 font-mono">{driver.trabajos}</td>
                                    <td className="px-3 py-2 text-sm text-gray-600">{driver.subsistema}</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Módulo de Transacciones */}
        {currentModule === 'transactions' && (
          <>
            {/* Controles de Transacciones */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <Search className="h-4 w-4 text-purple-400 mr-2" />
                    <span className="font-medium text-sm mr-3">Búsqueda:</span>
                    <input
                      type="text"
                      placeholder="Buscar por entidad, marca o KPI..."
                      className="flex-1 max-w-md px-3 py-2 text-sm border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={transactionSearchTerm}
                      onChange={(e) => setTransactionSearchTerm(e.target.value)}
                    />
                    <button 
                      onClick={() => setTransactionSearchTerm('')}
                      className="ml-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Limpiar
                    </button>
                  </div>
                  
                  {/* Toggle de vista */}
                  <div className="flex items-center ml-4">
                    <span className="text-sm font-medium mr-2">Vista:</span>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`px-3 py-1 text-xs rounded-l-md border ${
                        viewMode === 'table' 
                          ? 'bg-purple-600 text-white border-purple-600' 
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      📋 Tabla Completa
                    </button>
                    <button
                      onClick={() => setViewMode('compact')}
                      className={`px-3 py-1 text-xs rounded-r-md border ${
                        viewMode === 'compact' 
                          ? 'bg-purple-600 text-white border-purple-600' 
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      ⚡ Vista Compacta
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-sm">Filtros rápidos:</span>
                  {[
                    { key: 'all', label: 'Todas' },
                    { key: 'propias', label: 'Propias' },
                    { key: 'ajenas', label: 'Ajenas' },
                    { key: 'pos', label: 'POS' },
                    { key: 'atm', label: 'ATM' },
                    { key: 'internet', label: 'Internet' }
                  ].map(filter => (
                    <button
                      key={filter.key}
                      onClick={() => setCurrentFilter(filter.key)}
                      className={`px-3 py-1 text-xs rounded-full border transition-all ${
                        currentFilter === filter.key
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
                
                {(transactionSearchTerm || filteredTransactions.length < transactions.length) && (
                  <div className="text-sm text-gray-600 italic">
                    {transactionSearchTerm 
                      ? `${filteredTransactions.length} resultado(s) para "${transactionSearchTerm}"`
                      : `${filteredTransactions.length} transacciones mostradas`}
                  </div>
                )}
              </div>
            </div>

            {/* Vista de Tabla o Compacta */}
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <div className="inline-flex justify-center items-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                  <Search className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-gray-900 font-medium">No se encontraron resultados</h3>
                <p className="text-gray-500 mt-1">Intenta con otros términos de búsqueda o cambia los filtros activos.</p>
              </div>
            ) : viewMode === 'compact' ? (
              /* Vista Tabular Compacta con Columnas Visibles */
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  {/* Header con nombres de columnas destacado */}
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 border-b-4 border-purple-700">
                    <div className="grid grid-cols-7 gap-2 text-center font-bold text-sm">
                      <div>🏢 ENTIDAD</div>
                      <div>🔗 RED</div>
                      <div>📍 SUBRED</div>
                      <div>🏷️ ENTIDAD</div>
                      <div>🎯 MARCA</div>
                      <div>⚙️ CENTRO RESOLUTOR</div>
                      <div>📊 KPIs + DESCRIPCIÓN</div>
                    </div>
                  </div>

                  {/* Filas compactas con datos */}
                  <div className="divide-y divide-gray-100">
                    {filteredTransactions.map((transaction, index) => {
                      const isPropia = transaction.red === 'PROPIAS';
                      const isAjena = transaction.red === 'AJENA';
                      
                      return (
                        <div 
                          key={transaction.id} 
                          className={`grid grid-cols-7 gap-2 p-3 hover:bg-gray-50 transition-colors ${
                            isPropia ? 'bg-green-25' : isAjena ? 'bg-yellow-25' : ''
                          } ${
                            transaction.type.includes('pos') ? 'border-l-4 border-green-500' :
                            transaction.type.includes('internet') ? 'border-l-4 border-purple-500' :
                            transaction.type.includes('sms') ? 'border-l-4 border-teal-500' : 
                            transaction.type.includes('atm') ? 'border-l-4 border-blue-500' : 'border-l-4 border-gray-300'
                          }`}
                        >
                          {/* ENTIDAD (Sistema) */}
                          <div className="flex items-center text-sm">
                            <div className={`w-8 h-8 rounded-full mr-2 flex items-center justify-center text-white ${getSystemColorClasses(transaction.color).replace('bg-', 'bg-').replace('-100', '-500').replace('border-', '').replace('text-', '')}`}>
                              {getSystemIcon(transaction.entidadSistema)}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900 text-xs leading-tight">
                                {transaction.entidadSistema}
                              </div>
                              <div className="text-xs text-gray-500">ID: {transaction.id}</div>
                            </div>
                          </div>

                          {/* RED */}
                          <div className="flex items-center justify-center">
                            {transaction.red ? (
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                isPropia ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {isPropia ? '✓ PROPIAS' : '↗ AJENA'}
                              </span>
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </div>

                          {/* SUBRED */}
                          <div className="flex items-center justify-center">
                            {transaction.subred ? (
                              <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                                transaction.subred.includes('POS') ? 'bg-green-100 text-green-800' :
                                transaction.subred.includes('ATM') ? 'bg-blue-100 text-blue-800' :
                                transaction.subred.includes('INTERNET') ? 'bg-purple-100 text-purple-800' :
                                transaction.subred.includes('SMS') ? 'bg-teal-100 text-teal-800' :
                                transaction.subred.includes('BANCO') ? 'bg-orange-100 text-orange-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {transaction.subred}
                              </span>
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </div>

                          {/* ENTIDAD (Tipo) */}
                          <div className="flex items-center justify-center">
                            {transaction.entidadTipo ? (
                              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-bold">
                                {transaction.entidadTipo}
                              </span>
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </div>

                          {/* MARCA */}
                          <div className="flex items-center justify-center">
                            {transaction.marca && transaction.marca !== '-' ? (
                              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-bold">
                                {transaction.marca}
                              </span>
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </div>

                          {/* CENTRO RESOLUTOR */}
                          <div className="flex items-center text-xs">
                            {transaction.centroResolutor ? (
                              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium truncate">
                                {transaction.centroResolutor}
                              </span>
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </div>

                          {/* KPIs + DESCRIPCIÓN */}
                          <div className="space-y-2">
                            {/* KPIs compactos */}
                            <div>
                              <div className="text-xs font-semibold text-purple-700 mb-1">
                                📊 {transaction.kpis.length} KPI{transaction.kpis.length !== 1 ? 's' : ''}:
                              </div>
                              <div className="space-y-1 max-h-20 overflow-y-auto">
                                {transaction.kpis.map((kpi, kpiIndex) => (
                                  <div key={kpiIndex} className="bg-purple-50 border-l-2 border-purple-400 px-2 py-1 text-xs rounded">
                                    {kpi}
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Descripción */}
                            <div className="pt-2 border-t border-gray-200">
                              <div className="text-xs font-semibold text-gray-700 mb-1">📝 Descripción:</div>
                              <p className="text-xs text-gray-600 leading-relaxed">
                                {transaction.descripcion}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Vista de Tabla */
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ENTIDAD</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">RED</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">SUBRED</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ENTIDAD</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">MARCA</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">CENTRO RESOLUTOR</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">DESCRIPCIÓN</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredTransactions.map((transaction, index) => {
                        const isPropia = transaction.red === 'PROPIAS';
                        const isAjena = transaction.red === 'AJENA';
                        
                        return (
                          <tr 
                            key={transaction.id} 
                            className={`${
                              isPropia ? 'bg-green-50' : isAjena ? 'bg-yellow-50' : 'bg-white'
                            } ${
                              transaction.type.includes('pos') ? 'border-l-4 border-green-500' :
                              transaction.type.includes('internet') ? 'border-l-4 border-purple-500' :
                              transaction.type.includes('sms') ? 'border-l-4 border-teal-500' : 
                              transaction.type.includes('atm') ? 'border-l-4 border-blue-500' : ''
                            }`}
                          >
                            <td className="px-4 py-3 text-sm">
                              <div className="font-bold text-gray-900">{transaction.entidadSistema}</div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {transaction.red && (
                                <span className={`inline-block px-2 py-1 text-xs font-bold rounded ${
                                  isPropia ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                                }`}>
                                  {transaction.red}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <span className={`${
                                ['POS', 'INTERNET', 'ATM'].some(canal => transaction.subred && transaction.subred.includes(canal)) ? 'font-bold' : ''
                              }`}>
                                {transaction.subred}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {transaction.entidadTipo && (
                                <span className="inline-block px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded">
                                  {transaction.entidadTipo}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {transaction.marca && transaction.marca !== '-' && (
                                <span className="inline-block px-2 py-1 text-xs font-bold text-white bg-gray-600 rounded">
                                  {transaction.marca}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">{transaction.centroResolutor}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 max-w-xs">
                              <div className="mb-2">
                                <div className="text-xs font-semibold text-gray-700 mb-1">
                                  KPIs ({transaction.kpis.length}):
                                </div>
                                <div className="space-y-1 max-h-32 overflow-y-auto">
                                  {transaction.kpis.map((kpi, kpiIndex) => (
                                    <div key={kpiIndex} className="bg-gray-100 px-2 py-1 rounded text-xs border-l-2 border-gray-400">
                                      {kpi}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="pt-2 border-t border-gray-200">
                                <div className="text-xs font-semibold text-gray-700 mb-1">Descripción:</div>
                                <div className="text-sm">{transaction.descripcion}</div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SystemManagement;
