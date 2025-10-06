import React, { useState, useMemo } from 'react';
import { Search, Database, Server, X, Activity, Cloud, Layers, Settings, Grid, BarChart, CreditCard, Terminal, AlertTriangle, Zap, Upload, Download } from 'lucide-react';

const SystemManagement = () => {
  const [currentModule, setCurrentModule] = useState('drivers');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDriver, setExpandedDriver] = useState(null);
  const [activeTab, setActiveTab] = useState('cao');
  const [transactionSearchTerm, setTransactionSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('all');
  const [selectedEntity, setSelectedEntity] = useState(null);

  const driversCao = [
    { id: 1, name: 'OFICIAL', trabajos: 'OFICIAL', subsistema: 'CASBS', puertoLocal: '7704', puertoRemoto: '----', ip: '10.100.2.4', icon: <Database /> },
    { id: 2, name: 'ONLINE-COLAS', subsistema: 'CASBS', puertoLocal: '7706', puertoRemoto: '----', ip: '10.100.2.4', subDrivers: [{ trabajos: 'ONLINECOLA' }, { trabajos: 'ONLINESE1' }, { trabajos: 'ONLINESE2' }, { trabajos: 'ONLINESE3' }], icon: <Cloud /> },
    { id: 3, name: 'RECARGA', trabajos: 'ONLRECARGA', subsistema: 'CASBS', puertoLocal: '7716', puertoRemoto: '----', ip: '10.100.2.4', icon: <Activity /> },
    { id: 4, name: 'ONLINE MASIVO', trabajos: 'ONLINEMAS', subsistema: 'CASBS', puertoLocal: '7709', puertoRemoto: '----', ip: '10.100.2.4', icon: <Grid /> },
    { id: 5, name: 'TRANSACCIONAL', subsistema: 'CASBS', puertoLocal: '7900', puertoRemoto: '----', ip: '10.100.2.4', subDrivers: [{ trabajos: 'CAOTRX' }, { trabajos: 'CAOTRXSE1' }, { trabajos: 'CAOTRX800' }], icon: <BarChart /> },
    { id: 6, name: 'DRIVER SEGURIDAD - NSP ATALLA', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '7000', subDrivers: [{ trabajos: 'NSPATALLA' }, { trabajos: 'NSP800' }], ip: '10.13.20.10 UIO 1 / 10.13.20.11 UIO 2 / 10.10.4.181 GYE', icon: <Settings /> },
    { id: 7, name: 'DATAFAST VISA', subsistema: 'CASBS', puertoLocal: '7701', puertoRemoto: '----', ip: '192.168.61.2', subDrivers: [{ trabajos: 'DATVISA' }, { trabajos: 'DATVISA800' }, { trabajos: 'DATVISSE1' }, { trabajos: 'DATVISSE2' }, { trabajos: 'DATVISSE3' }, { trabajos: 'DATVISSE4' }, { trabajos: 'DATVISSE5' }, { trabajos: 'DATVISSE6' }, { trabajos: 'DATVISSE7' }, { trabajos: 'DATVISSE8' }, { trabajos: 'DATVISSE9' }], icon: <Cloud /> },
    { id: 8, name: 'DATAFAST DINERS', subsistema: 'CASBS', puertoLocal: '7702', puertoRemoto: '----', ip: '192.168.61.2', subDrivers: [{ trabajos: 'DATDINER' }, { trabajos: 'DATDINERTI' }, { trabajos: 'DATDINER800' }, { trabajos: 'DATDINSE1' }, { trabajos: 'DATDINSE2' }, { trabajos: 'DATDINSE3' }, { trabajos: 'DATDINSE4' }, { trabajos: 'DATDINSE5' }, { trabajos: 'DATDINSE6' }], icon: <Cloud /> },
    { id: 9, name: 'VISA EMISIÓN', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '10100', subDrivers: [{ trabajos: 'VISE' }, { trabajos: 'VISEVIPSE1' }, { trabajos: 'VISEVIPSE2' }, { trabajos: 'VISEVIPSE3' }, { trabajos: 'VISEVIPSE4' }, { trabajos: 'VISEVIPSE5' }, { trabajos: 'VISEVIPSE6' }, { trabajos: 'VISEVIPSE7' }, { trabajos: 'VISEVIPSE8' }, { trabajos: 'VISEVIPSE9' }, { trabajos: 'VISE800' }], ip: 'UIO 10.11.20.10 / GYE 10.11.4.10', icon: <Activity /> },
    { id: 10, name: 'VISA ADQUIRENCIA', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '10101', subDrivers: [{ trabajos: 'VISA' }, { trabajos: 'VISATI' }, { trabajos: 'VISAVIPSE1' }, { trabajos: 'VISAVIPSE2' }, { trabajos: 'VISAVIPSE3' }, { trabajos: 'VISAVIPSE4' }, { trabajos: 'VISAVIPSE5' }, { trabajos: 'VISAVIPSE6' }, { trabajos: 'VISAVIPSE7' }, { trabajos: 'VISAVIPSE8' }, { trabajos: 'VISAVIPSE9' }, { trabajos: 'VISA800' }], ip: 'UIO 10.11.20.10 / GYE 10.11.4.10', icon: <Activity /> },
    { id: 11, name: 'DCI', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '3083', subDrivers: [{ trabajos: 'DCI' }, { trabajos: 'DCICAOSE1' }, { trabajos: 'DCIINTERTI' }, { trabajos: 'DCIREENVIO' }, { trabajos: 'DCI800' }, { trabajos: 'DCIVTXINTE' }], ip: 'UIO 199.38.157.21 / GYE 199.38.157.21', icon: <Server /> },
    { id: 12, name: 'DCI2', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '3083', subDrivers: [{ trabajos: 'DC2' }, { trabajos: 'DC2CAOSE1' }, { trabajos: 'DC2INTERTI' }, { trabajos: 'DC2REENVIO' }, { trabajos: 'DC2800' }], ip: 'UIO 199.38.157.41 / GYE 199.38.157.41', icon: <Server /> },
    { id: 13, name: 'MCI', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '6083', subDrivers: [{ trabajos: 'MASTER' }, { trabajos: 'MASTERSE1' }, { trabajos: 'MASTERSE2' }, { trabajos: 'MASTERSE3' }, { trabajos: 'MASTERSE4' }, { trabajos: 'MASTERSE5' }, { trabajos: 'MASTERTI' }, { trabajos: 'MASTER800' }], ip: 'UIO 10.121.70.55 / 10.121.70.56 / GYE 10.121.30.55', icon: <Database /> },
    { id: 14, name: 'MDS', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '6086', subDrivers: [{ trabajos: 'CAOMDS' }, { trabajos: 'CAOMDSSE1' }, { trabajos: 'CAOMDSSE2' }, { trabajos: 'CAOMDSSE3' }, { trabajos: 'CAOMDSSE4' }, { trabajos: 'CAOMDSSE5' }, { trabajos: 'CAOMDSTI' }, { trabajos: 'CAOMDS800' }], ip: 'UIO 10.121.70.55 / 10.121.70.56 / GYE 10.121.30.55', icon: <Database /> },
    { id: 15, name: 'BANRED', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '2015', subDrivers: [{ trabajos: 'BANRED' }, { trabajos: 'BANRED800' }, { trabajos: 'CAOBANSE1' }, { trabajos: 'CAOBANSE2' }, { trabajos: 'CAOBANSE3' }, { trabajos: 'CAOBANSE4' }], ip: '172.20.20.55', icon: <Layers /> },
    { id: 16, name: 'BANRED-B24', subsistema: 'CASBS', puertoLocal: '7793', puertoRemoto: '----', subDrivers: [{ trabajos: 'CAOB24' }, { trabajos: 'CAOB24SE1' }, { trabajos: 'CAOB24SMV' }, { trabajos: 'CAOB24800' }], ip: '172.30.30.4', icon: <Layers /> },
    { id: 17, name: 'BANRED-B25', subsistema: 'CASBS', puertoLocal: '7795', puertoRemoto: '----', subDrivers: [{ trabajos: 'CAOB25' }, { trabajos: 'CAOB25SE1' }, { trabajos: 'CAOB25SE2' }, { trabajos: 'CAOB25SE3' }, { trabajos: 'CAOB25SE4' }, { trabajos: 'CAOB25SE5' }, { trabajos: 'CAOB25800' }], ip: '172.30.30.4', icon: <Layers /> },
    { id: 18, name: 'BANCO PICHINCHA (EFECTIVO EXPRESS)', subsistema: 'CASBS', puertoLocal: '7715', puertoRemoto: '----', ip: '192.168.77.113', subDrivers: [{ trabajos: 'CAOPICH' }, { trabajos: 'CAOPICH800' }, { trabajos: 'CAOPICSE1' }], icon: <Grid /> },
    { id: 19, name: 'PULSE', subsistema: 'CASBS', puertoLocal: '4198', puertoRemoto: '----', ip: '199.38.157.104', subDrivers: [{ trabajos: 'CAOPUL' }, { trabajos: 'CAOPULSE1' }, { trabajos: 'CAOPULTO' }, { trabajos: 'CAOPUL800' }], icon: <Activity /> },
    { id: 20, name: 'ATM DINERS', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '8109', ip: '10.100.176.223', subDrivers: [{ trabajos: 'DATBRK' }, { trabajos: 'DATBRK800' }], icon: <Grid /> },
    { id: 21, name: 'BROKER (TRANSFERENCIAS INTERBANCARIAS)', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '9001', ip: '10.100.176.223', subDrivers: [{ trabajos: 'CAOBRO' }, { trabajos: 'CAOBROSE1' }, { trabajos: 'CAOBROTIME' }, { trabajos: 'CAOBRO800' }], icon: <Grid /> },
    { id: 22, name: 'DOCK', subsistema: 'BANREDSBS', puertoLocal: '----', puertoRemoto: '10185', ip: '10.19.225.10', subDrivers: [{ trabajos: 'CAODCK' }, { trabajos: 'CAODCKINTE' }, { trabajos: 'CAODCKSE1' }, { trabajos: 'CAODCK800' }], icon: <Layers /> },
    { id: 23, name: 'MÓDULO GRÁFICO', subsistema: 'QINTER', puertoLocal: '52000 / 51000 / 64000 / 63000', puertoRemoto: '----', ip: '----', subDrivers: [{ trabajos: 'LISTEN2550' }, { trabajos: 'LISTEN550' }, { trabajos: 'LISTEN2721' }, { trabajos: 'LISTEN721' }], icon: <BarChart /> },
    { id: 24, name: 'TRABAJO DE DEPURACIÓN', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '----', ip: 'Op. DEPURCION ARCHIVOS TEMPORALES', subDrivers: [{ trabajos: 'CAODEPURA' }], icon: <Settings /> },
    { id: 25, name: 'BPC-BP', subsistema: 'CASBS', puertoLocal: '7723', puertoRemoto: '----', ip: '10.14.64.11 o 10.14.64.12', subDrivers: [{ trabajos: 'CAOBPC' }, { trabajos: 'CAOBPCSE1' }, { trabajos: 'CAOBPCSE2' }, { trabajos: 'CAOBPCSE3' }, { trabajos: 'CAOBPCSE4' }, { trabajos: 'CAOBPC800' }], icon: <Settings /> },
    { id: 26, name: 'JARDIN AZUAYO', subsistema: 'CASBS', puertoLocal: '7765', puertoRemoto: '----', ip: '10.100.2.21', subDrivers: [{ trabajos: 'CAOJAR800' }, { trabajos: 'CAOJARSE9' }, { trabajos: 'CAOJARSE8' }, { trabajos: 'CAOJARSE7' }, { trabajos: 'CAOJARSE6' }, { trabajos: 'CAOJARSE5' }, { trabajos: 'CAOJARSE4' }, { trabajos: 'CAOJARSE3' }, { trabajos: 'CAOJARSE2' }, { trabajos: 'CAOJARSE1' }, { trabajos: 'CAOJAR' }], icon: <Grid /> },
    { id: 27, name: 'VTEX', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '10102', ip: 'VALIDAR LA IP Y LA PARAMETRIZACIÓN', subDrivers: [{ trabajos: 'VTEX' }, { trabajos: 'VTEXVIPSE1' }, { trabajos: 'VTEXVIPSE2' }, { trabajos: 'VTEXVIPSE3' }, { trabajos: 'VTEXVIPSE4' }, { trabajos: 'VTEXVIPSE5' }, { trabajos: 'VTEXVIPSE6' }, { trabajos: 'VTEXVIPSE7' }, { trabajos: 'VTEXVIPSE8' }, { trabajos: 'VTEXVIPSE9' }, { trabajos: 'VTEX800' }, { trabajos: 'VTEX2INTER' }], icon: <Activity /> }
  ];

  const driversGestor = [
    { id: 101, name: 'OFICIAL', subsistema: 'ASEB10SBS', puertoLocal: '----', puertoRemoto: '7704', ip: '10.100.2.21', icon: <Settings />, subDrivers: [
      { trabajos: 'ASGOFIADM' },
      { trabajos: 'ASGOFIADM2' },
      { trabajos: 'CAOOFIASG' }
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
      { trabajos: 'CAOONLINEM' }
    ]},
    { id: 105, name: 'TRANSACCIONAL', subsistema: 'ASEB10SBS', puertoLocal: '----', puertoRemoto: '7900', ip: '10.100.2.21', icon: <BarChart />, subDrivers: [
      { trabajos: 'DATGESCTRX' },
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
    { id: 111, name: 'WRKJOBSCDE', subsistema: 'QINTER', puertoLocal: '52000 / 60001 / 53000 / 51000 / 62000 / 63000 / 64000', puertoRemoto: '----', ip: '----', icon: <BarChart />, subDrivers: [
      { trabajos: 'LISTEN2' },
      { trabajos: 'LISTEN610' },
      { trabajos: 'PLEXLISOND' },
      { trabajos: 'PLEXLISTEN' },
      { trabajos: 'PLEXLIS610' },
      { trabajos: 'PLEXLIS72A' },
      { trabajos: 'PLEXLIS72B' }
    ]},
    { id: 112, name: 'SMSLISTEN', subsistema: 'QSMSSBS', puertoLocal: '24001', puertoRemoto: '----', ip: '----', icon: <Activity />, trabajos: 'SMSLISTEN'},
    { id: 113, name: 'CIERRE DE OPERACIONES', subsistema: 'ASEB10SBS', puertoLocal: '----', puertoRemoto: '----', ip: '10.100.2.4', icon: <Database />, subDrivers: [
      { trabajos: 'ASGCIEADM (5 TRABAJOS DEBEN ESTAR LEVANTADOS)' }
    ]},
    { id: 114, name: 'IMPRESIÓN TARJETAS DE DEBITO DOCK', subsistema: 'ASEB10SBS', puertoLocal: '----', puertoRemoto: '----', ip: '10.100.2.4', icon: <Grid />, subDrivers: [
      { trabajos: 'DTARB001' }
    ]}
  ];

  const entities = [
    {
      name: "DCI",
      instances: [
        { red: "AJENA", subred: "GENERAL", entidad: "DC", marca: "-", tipoVia: "", centroResolutor: "", thinkserver: "KPI - DCI - Transacciones aprobadas, KPI - DCI - Transacciones rechazadas", descripcion: "Transacciones que vienen de fuera, para Diners y Discover", tipo: "ADQUIRENCIA" },
        { red: "PROPIAS", subred: "GENERAL", entidad: "IN", marca: "DN", tipoVia: "", centroResolutor: "", thinkserver: "", descripcion: "Transacciones que nosotros capturamos y enviamos.", tipo: "EMISIÓN" }
      ]
    },
    {
      name: "Datafast Diners/Discover",
      instances: [
        { red: "PROPIAS", subred: "POS", entidad: "DC", marca: "-", tipoVia: "", centroResolutor: "", thinkserver: "KPI - DataFast - Diners -Transacciones aprobadas, KPI - DataFast - Diners - Transacciones rechazadas, KPI - DataFast - Discover - Transacciones aprobadas, KPI - DataFast - Discover - Transacciones rechazadas", descripcion: "Transacciones para Diners y Discover a través de POS", tipo: "ADQUIRENCIA" }
      ]
    },
    {
      name: "Datafast Visa/Mastercard",
      instances: [
        { red: "PROPIAS", subred: "POS", entidad: "PI", marca: "-", tipoVia: "", centroResolutor: "", thinkserver: "KPI - DataFast - VISA - Transacciones aprobadas, KPI - DataFast - VISA - Transacciones rechazadas, KPI - DataFast - Master Card - Transacciones aprobadas, KPI - DataFast - Master Card - Transacciones rechazadas", descripcion: "Transacciones para Visa y Mastercard a través de POS", tipo: "ADQUIRENCIA" }
      ]
    },
    {
      name: "Visa Internacional",
      instances: [
        { red: "AJENA", subred: "GENERAL", entidad: "PI", marca: "VI", tipoVia: "", centroResolutor: "", thinkserver: "KPI - VAP - Transacciones aprobadas, KPI - VAP - Transacciones rechazadas", descripcion: "Transacciones que vienen de fuera.", tipo: "ADQUIRENCIA" },
        { red: "PROPIAS", subred: "GENERAL", entidad: "IN", marca: "VI", tipoVia: "", centroResolutor: "", thinkserver: "", descripcion: "Transacciones que nosotros capturamos y enviamos.", tipo: "EMISIÓN" }
      ]
    },
    {
      name: "MasterCard Internacional",
      instances: [
        { red: "AJENA", subred: "GENERAL", entidad: "PI", marca: "MC", tipoVia: "", centroResolutor: "", thinkserver: "KPI - MCI - Transacciones aprobadas, KPI - MCI - Transacciones rechazadas", descripcion: "Transacciones que vienen de fuera a través de MasterCard.", tipo: "ADQUIRENCIA" },
        { red: "PROPIAS", subred: "GENERAL", entidad: "IN", marca: "MC", tipoVia: "", centroResolutor: "", thinkserver: "", descripcion: "Transacciones que nosotros capturamos y enviamos a MasterCard.", tipo: "EMISIÓN" }
      ]
    },
    {
      name: "MasterCard MDS",
      instances: [
        { red: "PROPIAS", subred: "ATM", entidad: "IN", marca: "MC", tipoVia: "", centroResolutor: "", thinkserver: "KPI - MCI MDS - Transacciones aprobadas, KPI - MCI MDS - Transacciones rechazadas", descripcion: "Transacciones con tarjetas ajenas MasterCard en cajeros nuestros.", tipo: "ADQUIRENCIA" }
      ]
    },
    {
      name: "Botón de pagos Placetopay",
      instances: [
        { red: "PROPIAS", subred: "INTERNET", entidad: "", marca: "", tipoVia: "PlacetoPay", centroResolutor: "", thinkserver: "KPI - Nuevo Botón de Pagos PTP - Transacciones anuladas, KPI - Nuevo Botón de Pagos PTP - Transacciones aprobadas, KPI - Nuevo Botón de Pagos PTP - Transacciones rechazadas, KPI - Nuevo Botón de Pagos PTP - Transacciones totales", descripcion: "Transacciones que se realizan en el botón de pagos a través de Placetopay", tipo: "ADQUIRENCIA" }
      ]
    },
    {
      name: "Botón de pagos Datafast",
      instances: [
        { red: "PROPIAS", subred: "INTERNET", entidad: "", marca: "", tipoVia: "Datafast", centroResolutor: "", thinkserver: "", descripcion: "Transacciones que se realizan en el botón de pagos a través de Datafast", tipo: "ADQUIRENCIA" }
      ]
    },
    {
      name: "Nuevo Botón de pagos (Interdin)",
      instances: [
        { red: "PROPIAS", subred: "INTERNET", entidad: "", marca: "", tipoVia: "Botón Pagos", centroResolutor: "", thinkserver: "KPI - Nuevo Boton de pagos - MPI, KPI - Nuevo Botón de Pagos - Transacciones anuladas, KPI - Nuevo Botón de Pagos - Transacciones aprobadas, KPI - Nuevo Botón de Pagos - Transacciones negadas, KPI - Nuevo Botón de Pagos - Transacciones totales, KPI - Nuevo Boton de pagos - VPOS", descripcion: "Transacciones que se realizan en el botón de pagos a través del Botón de Interdin", tipo: "ADQUIRENCIA" }
      ]
    },
    {
      name: "Efectivo express",
      instances: [
        { red: "PROPIAS", subred: "BANCO PICHINCHA", entidad: "", marca: "", tipoVia: "Pichincha", centroResolutor: "", thinkserver: "KPI - Pichincha - Diners - Transacciones aprobadas, KPI - Pichincha - Diners - Transacciones rechazadas, KPI - Pichincha - Mastercard - Transacciones aprobadas, KPI - Pichincha - Mastercard - Transacciones rechazadas, KPI - Pichincha - Visa - Transacciones aprobadas, KPI - Pichincha - Visa - Transacciones rechazadas", descripcion: "Transacciones que se realizan a través de ventanilla del Banco Pichincha (Efectivo Express y Pago de Universidades).", tipo: "ADQUIRENCIA" }
      ]
    },
    {
      name: "SMS",
      instances: [
        { red: "PROPIAS", subred: "SMS", entidad: "", marca: "", tipoVia: "", centroResolutor: "", thinkserver: "KPI - SMS CAO - Transacciones aprobadas, KPI - SMS CAO - Transacciones rechazadas", descripcion: "Compra de minutos a través de SMS.", tipo: "OTRO" }
      ]
    },
    {
      name: "Discover(Pulse)",
      instances: [
        { red: "PROPIAS", subred: "ATM", entidad: "IN", marca: "DN", tipoVia: "", centroResolutor: "", thinkserver: "KPI - PULSE ATM - Transacciones aprobadas, KPI - PULSE ATM - Transacciones rechazadas", descripcion: "Transacciones con tarjetas ajenas en cajeros nuestros.", tipo: "ADQUIRENCIA" }
      ]
    },
    {
      name: "Banred",
      instances: [
        { red: "PROPIAS", subred: "ATM", entidad: "", marca: "", tipoVia: "Banred", centroResolutor: "", thinkserver: "KPI - BANRED - Transacciones aprobadas, KPI - BANRED - Transacciones rechazadas", descripcion: "Transacciones ATM que se realizan en cajeros que no son nuestros.", tipo: "EMISIÓN" }
      ]
    },
    {
      name: "Banred B-25",
      instances: [
        { red: "PROPIAS", subred: "BANCO PICHINCHA", entidad: "", marca: "", tipoVia: "B24", centroResolutor: "", thinkserver: "KPI - Banred B25 - ATM - Transacciones aprobadas, KPI - Banred B25 - ATM - Transacciones rechazadas", descripcion: "Transacciones con tarjetas de crédito que vienen de Banco Pichincha a través de B25.", tipo: "ADQUIRENCIA" },
        { red: "PROPIAS", subred: "ATM", entidad: "", marca: "", tipoVia: "B24", centroResolutor: "", thinkserver: "KPI - Banred B25 - PICHINCHA - Transacciones aprobadas, KPI - Banred B25 - PICHINCHA - Transacciones rechazadas", descripcion: "Transacciones con tarjetas de crédito que vienen a través de nuestros cajeros.", tipo: "ADQUIRENCIA" }
      ]
    },
    {
      name: "Banred B-24",
      instances: [
        { red: "", subred: "", entidad: "", marca: "", tipoVia: "", centroResolutor: "Banco Pichincha", thinkserver: "KPI - Banred B24 - Transacciones aprobadas, KPI - Banred B24 - Transacciones rechazadas", descripcion: "Transacciones con tarjetas de débito.", tipo: "OTRO" }
      ]
    },
    {
      name: "CASH ADVANCE Y DONACIONES (MULTICANALIDAD WEB Y MOBILE)",
      instances: [
        { red: "PROPIAS", subred: "INTERNET", entidad: "", marca: "", tipoVia: "Technisys", centroResolutor: "", thinkserver: "", descripcion: "Transacciones monetarias desde el portal y app multicanalidad para Cash Advance y Donaciones.", tipo: "EMISIÓN" }
      ]
    },
    {
      name: "Dock",
      instances: [
        { red: "", subred: "", entidad: "", marca: "", tipoVia: "", centroResolutor: "Banco Diners Club del Ecuador", thinkserver: "KPI - DOCK - Transacciones aprobadas, KPI - DOCK - Transacciones rechazadas", descripcion: "CONSULTA DE SALDOS, AVANCES DE EFECTIVO, CAMBIO DE PIN Y ANULACIONES.", tipo: "EMISIÓN" }
      ]
    },
    {
      name: "BPC - BP",
      instances: [
        { red: "", subred: "", entidad: "", marca: "", tipoVia: "", centroResolutor: "Ca BPC", thinkserver: "KPI - BPC - Transacciones aprobadas, KPI - BPC - Transacciones rechazadas", descripcion: "Transacciones Tarjeta Prepago Transporte Banco Pichincha.", tipo: "EMISIÓN" }
      ]
    },
    {
      name: "Jardín Azuayo",
      instances: [
        { red: "", subred: "", entidad: "", marca: "", tipoVia: "", centroResolutor: "Ca Jardín Azuayo", thinkserver: "KPI - Jardín Azuayo - Transacciones aprobadas, KPI - Jardín Azuayo - Transacciones rechazadas", descripcion: "Transacciones con tarjeta débito Coop. Jardin Azuayo.", tipo: "ADQUIRENCIA" }
      ]
    }
  ];

  const activeDrivers = activeTab === 'cao' ? driversCao : driversGestor;

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

  const filteredEntities = useMemo(() => {
    if (!transactionSearchTerm.trim()) return entities;
    
    const term = transactionSearchTerm.toLowerCase();
    return entities.filter(entity => {
      if (searchField === 'all' || searchField === 'name') {
        if (entity.name.toLowerCase().includes(term)) return true;
      }
      
      return entity.instances.some(inst => {
        if (searchField === 'all' || searchField === 'red') {
          if (inst.red.toLowerCase().includes(term)) return true;
        }
        if (searchField === 'all' || searchField === 'subred') {
          if (inst.subred.toLowerCase().includes(term)) return true;
        }
        if (searchField === 'all' || searchField === 'entidad') {
          if (inst.entidad.toLowerCase().includes(term)) return true;
        }
        if (searchField === 'all' || searchField === 'marca') {
          if (inst.marca.toLowerCase().includes(term)) return true;
        }
        if (searchField === 'all' || searchField === 'tipoVia') {
          if (inst.tipoVia.toLowerCase().includes(term)) return true;
        }
        if (searchField === 'all' || searchField === 'centroResolutor') {
          if (inst.centroResolutor.toLowerCase().includes(term)) return true;
        }
        if (searchField === 'all' || searchField === 'thinkserver') {
          if (inst.thinkserver.toLowerCase().includes(term)) return true;
        }
        if (searchField === 'all' || searchField === 'descripcion') {
          if (inst.descripcion.toLowerCase().includes(term)) return true;
        }
        return false;
      });
    });
  }, [transactionSearchTerm, searchField]);

  const toggleDriver = (driverId) => {
    setExpandedDriver(expandedDriver === driverId ? null : driverId);
  };

  const getKpisArray = (thinkserver) => {
    if (!thinkserver) return [];
    return thinkserver.split(',').map(k => k.trim()).filter(k => k);
  };

  const selectedEntityData = selectedEntity !== null ? filteredEntities[selectedEntity] : null;

  return (
    <div className="min-h-screen bg-black text-green-400" style={{ fontFamily: 'Courier New, monospace' }}>
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .blink { animation: blink 1s infinite; }
        .glow-green { box-shadow: 0 0 10px rgba(0, 255, 65, 0.6), inset 0 0 10px rgba(0, 255, 65, 0.1); }
        .glow-cyan { box-shadow: 0 0 10px rgba(0, 255, 255, 0.6), inset 0 0 10px rgba(0, 255, 255, 0.1); }
        .glow-magenta { box-shadow: 0 0 10px rgba(255, 0, 255, 0.6), inset 0 0 10px rgba(255, 0, 255, 0.1); }
        .glow-yellow { box-shadow: 0 0 10px rgba(255, 255, 0, 0.6), inset 0 0 10px rgba(255, 255, 0, 0.1); }
      `}</style>

      {/* Header Matrix Style */}
      <div className="bg-black border-b-2 border-green-500 shadow-lg shadow-green-500/50">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {currentModule === 'drivers' ? (
                <>
                  <Server className="mr-3 h-8 w-8 text-green-400 animate-pulse" />
                  <div>
                    <h1 className="text-2xl font-bold text-green-400 tracking-wider">
                      [SYSTEM MATRIX] DRIVER ACCESS
                    </h1>
                    <p className="text-green-500 text-xs mt-1">
                      &gt; SECURED CONNECTION - CAO/GESTOR MAINFRAME
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Terminal className="mr-3 h-8 w-8 text-cyan-400 animate-pulse" />
                  <div>
                    <h1 className="text-2xl font-bold text-cyan-400 tracking-wider">
                      SISTEMA_TRANSACCIONES
                    </h1>
                    <p className="text-magenta-400 text-xs mt-1">
                      [<span className="text-yellow-400 blink">ACTIVO</span>] ENTIDADES: <span className="text-cyan-400 font-bold">{entities.length}</span>
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="text-right">
              <div className="text-green-500 text-xs">STATUS: ONLINE</div>
              <div className="text-green-400 text-xs font-mono">█████ 100%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Navigation Matrix */}
        <div className="bg-black border border-green-500 rounded-lg p-4 mb-6 shadow-lg shadow-green-500/30">
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentModule('drivers')} 
              className={`px-4 py-2 rounded font-mono text-sm font-bold transition-all ${
                currentModule === 'drivers'
                  ? 'bg-green-500 text-black shadow-lg shadow-green-500/50 border-2 border-green-400' 
                  : 'bg-black text-green-500 border border-green-500 hover:bg-green-900'
              }`}
            >
              <div className="flex items-center">
                <Server className="w-4 h-4 mr-1" />
                &gt; DRIVERS_MODULE
              </div>
            </button>
            <button 
              onClick={() => setCurrentModule('transactions')} 
              className={`px-4 py-2 rounded font-mono text-sm font-bold transition-all ${
                currentModule === 'transactions'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/50 border-2 border-cyan-400' 
                  : 'bg-black text-cyan-500 border border-cyan-500 hover:bg-cyan-900'
              }`}
            >
              <div className="flex items-center">
                <Terminal className="w-4 h-4 mr-1" />
                &gt; TRANSACTIONS_MODULE
              </div>
            </button>
          </div>
        </div>

        {/* Drivers Module */}
        {currentModule === 'drivers' && (
          <>
            <div className="bg-black border border-green-500 rounded-lg p-4 mb-6 shadow-lg shadow-green-500/30">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setActiveTab('cao')} 
                    className={`px-4 py-2 rounded font-mono text-sm font-bold transition-all ${
                      activeTab === 'cao' 
                        ? 'bg-green-500 text-black shadow-lg shadow-green-500/50 border-2 border-green-400' 
                        : 'bg-black text-green-500 border border-green-500 hover:bg-green-900'
                    }`}
                  >
                    <div className="flex items-center">
                      <Server className="w-4 h-4 mr-1" />
                      CAO [{driversCao.length}]
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveTab('gestor')} 
                    className={`px-4 py-2 rounded font-mono text-sm font-bold transition-all ${
                      activeTab === 'gestor' 
                        ? 'bg-green-500 text-black shadow-lg shadow-green-500/50 border-2 border-green-400' 
                        : 'bg-black text-green-500 border border-green-500 hover:bg-green-900'
                    }`}
                  >
                    <div className="flex items-center">
                      <Settings className="w-4 h-4 mr-1" />
                      GESTOR [{driversGestor.length}]
                    </div>
                  </button>
                </div>
                
                <div className="relative max-w-md flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="&gt; SEARCH DRIVER..."
                    className="w-full pl-9 pr-4 py-2 text-sm bg-black border-2 border-green-500 text-green-400 rounded font-mono focus:ring-2 focus:ring-green-500 focus:shadow-lg focus:shadow-green-500/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4 px-1">
              <div className="text-sm text-green-400 font-mono">
                &gt; {activeTab === 'cao' ? 'CAO_DRIVERS' : 'GESTOR_DRIVERS'}
                <span className="ml-2 bg-green-500 text-black px-2 py-0.5 rounded text-xs font-bold">
                  {filteredDrivers.length} ACTIVE
                </span>
              </div>
              <div className="flex space-x-2">
                <span className="inline-flex items-center text-xs bg-black border border-green-500 text-green-400 px-2 py-1 rounded font-mono">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>LOCAL
                </span>
                <span className="inline-flex items-center text-xs bg-black border border-yellow-500 text-yellow-400 px-2 py-1 rounded font-mono">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1 animate-pulse"></span>REMOTE
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {filteredDrivers.map((driver) => (
                <div key={driver.id} className="relative">
                  <button
                    onClick={() => toggleDriver(driver.id)}
                    className={`w-full h-24 flex flex-col items-center justify-center rounded border-2 transition-all ${
                      expandedDriver === driver.id 
                        ? 'bg-green-500 text-black border-green-400 shadow-lg shadow-green-500/50' 
                        : 'bg-black hover:bg-green-900 border-green-500 text-green-400 hover:shadow-lg hover:shadow-green-500/30'
                    }`}
                  >
                    <div className="absolute top-0 left-0 right-0 flex justify-center -mt-2">
                      {driver.puertoLocal && driver.puertoLocal !== '----' && (
                        <span className="text-xs font-mono px-1.5 py-0.5 rounded mx-0.5 bg-green-500 text-black border border-green-400 font-bold">
                          L:{driver.puertoLocal}
                        </span>
                      )}
                      {driver.puertoRemoto && driver.puertoRemoto !== '----' && (
                        <span className="text-xs font-mono px-1.5 py-0.5 rounded mx-0.5 bg-yellow-500 text-black border border-yellow-400 font-bold">
                          R:{driver.puertoRemoto}
                        </span>
                      )}
                    </div>

                    <div className="mt-1">
                      <div className={`h-5 w-5 ${expandedDriver === driver.id ? 'text-black' : 'text-green-400'}`}>
                        {driver.icon || <Database />}
                      </div>
                    </div>
                    
                    <div className="px-1 mt-1 text-center">
                      <h3 className="text-xs font-bold leading-tight truncate max-w-full font-mono">{driver.name}</h3>
                      <p className={`text-xs mt-0.5 ${expandedDriver === driver.id ? 'text-black' : 'text-green-500'}`}>
                        {driver.subDrivers ? `${driver.subDrivers.length} JOBS` : "1 JOB"}
                      </p>
                    </div>
                  </button>

                  {expandedDriver === driver.id && (
                    <>
                      <div 
                        className="fixed inset-0 bg-black bg-opacity-90 z-10"
                        onClick={() => setExpandedDriver(null)}
                      ></div>
                      
                      <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black border-2 rounded-lg shadow-2xl z-20 w-11/12 max-w-4xl max-h-[80vh] overflow-auto ${
                        driver.puertoRemoto && driver.puertoRemoto !== '----' 
                          ? 'border-yellow-400 shadow-yellow-400/50' 
                          : 'border-green-500 shadow-green-500/50'
                      }`}>
                        <div className={`sticky top-0 text-black px-4 py-3 flex justify-between items-center border-b-2 ${
                          driver.puertoRemoto && driver.puertoRemoto !== '----'
                            ? 'bg-yellow-400 border-yellow-300'
                            : 'bg-green-500 border-green-400'
                        }`}>
                          <div className="flex items-start flex-1">
                            <div className="mr-3 mt-1">
                              {driver.icon || <Database className="h-5 w-5" />}
                            </div>
                            <div className="flex-1">
                              <h2 className="text-lg font-bold font-mono">[ACCESS] {driver.name}</h2>
                              <p className="text-xs text-black/80 font-mono">&gt; {driver.subsistema} - {driver.subDrivers ? `${driver.subDrivers.length} JOBS` : "1 JOB"}</p>
                              
                              <div className="mt-3 flex gap-3">
                                {driver.puertoLocal && driver.puertoLocal !== '----' && (
                                  <div className="bg-black/20 border-2 border-black/40 rounded-lg px-4 py-2">
                                    <div className="text-xs font-bold uppercase tracking-wider mb-1">Puerto Local</div>
                                    <div className="text-3xl font-bold font-mono">{driver.puertoLocal}</div>
                                  </div>
                                )}
                                {driver.puertoRemoto && driver.puertoRemoto !== '----' && (
                                  <div className="bg-black/20 border-2 border-black/40 rounded-lg px-4 py-2">
                                    <div className="text-xs font-bold uppercase tracking-wider mb-1">Puerto Remoto</div>
                                    <div className="text-3xl font-bold font-mono">{driver.puertoRemoto}</div>
                                  </div>
                                )}
                                {driver.ip && (
                                  <div className="bg-black/20 border-2 border-black/40 rounded-lg px-4 py-2 flex-1">
                                    <div className="text-xs font-bold uppercase tracking-wider mb-1">IP Address</div>
                                    <div className="text-sm font-bold font-mono leading-tight">{driver.ip}</div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <button 
                            onClick={() => setExpandedDriver(null)}
                            className="p-1 rounded-full hover:bg-black/20 transition-colors ml-2"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                        
                        <div className="p-4">
                          <div className="overflow-x-auto">
                            <table className="min-w-full">
                              <thead>
                                <tr className="border-b-2 border-green-500">
                                  <th className="px-3 py-2 text-left text-xs font-bold text-green-400 uppercase tracking-wider font-mono">TRABAJOS</th>
                                  <th className="px-3 py-2 text-left text-xs font-bold text-green-400 uppercase tracking-wider font-mono">SUBSISTEMA</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-green-900">
                                {driver.subDrivers ? (
                                  driver.subDrivers.map((subDriver, index) => (
                                    <tr key={index} className="hover:bg-green-900/30">
                                      <td className="px-3 py-2 text-sm text-green-400 font-mono font-bold">&gt; {subDriver.trabajos}</td>
                                      <td className="px-3 py-2 text-sm text-green-500 font-mono">{driver.subsistema}</td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr className="hover:bg-green-900/30">
                                    <td className="px-3 py-2 text-sm text-green-400 font-mono font-bold">&gt; {driver.trabajos}</td>
                                    <td className="px-3 py-2 text-sm text-green-500 font-mono">{driver.subsistema}</td>
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

        {/* Transactions Module - NUEVO */}
        {currentModule === 'transactions' && (
          <div style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)',
            textShadow: '0 0 5px rgba(0, 255, 255, 0.5)'
          }}>
            {/* Search Panel */}
            <div className="border-2 border-cyan-400 p-3 mb-3 glow-cyan bg-black">
              <div className="grid grid-cols-3 md:grid-cols-9 gap-2 mb-3">
                {[
                  { value: 'all', label: 'TODO', color: 'green', size: 'md' },
                  { value: 'name', label: 'ENTIDAD', color: 'cyan', size: 'lg' },
                  { value: 'red', label: 'RED', color: 'magenta', size: 'lg' },
                  { value: 'subred', label: 'SUBRED', color: 'yellow', size: 'lg' },
                  { value: 'marca', label: 'MARCA', color: 'green', size: 'lg' },
                  { value: 'tipoVia', label: 'TIPO_VÍA', color: 'cyan', size: 'lg' },
                  { value: 'centroResolutor', label: 'CENTRO_RES', color: 'magenta', size: 'lg' },
                  { value: 'thinkserver', label: 'KPI', color: 'yellow', size: 'xs' },
                  { value: 'descripcion', label: 'DESC', color: 'green', size: 'xs' }
                ].map(field => (
                  <button
                    key={field.value}
                    onClick={() => setSearchField(field.value)}
                    className={`border-2 px-2 py-2 transition-all ${
                      field.size === 'lg' ? 'text-lg font-bold' : field.size === 'md' ? 'text-base font-bold' : 'text-xs'
                    } ${
                      searchField === field.value 
                        ? `border-${field.color}-400 bg-${field.color}-950 bg-opacity-40 text-${field.color}-400 font-bold`
                        : 'border-gray-700 text-gray-500'
                    }`}
                  >
                    {field.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 border-2 border-cyan-400 p-3 bg-black">
                <span className="text-cyan-400 text-xl">&gt;</span>
                <input
                  type="text"
                  placeholder="BUSCAR..."
                  value={transactionSearchTerm}
                  onChange={(e) => setTransactionSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-cyan-400 placeholder-cyan-900 text-xl"
                />
                <Zap size={24} className="text-yellow-400 animate-pulse" />
              </div>
            </div>

            {/* Entity Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-3">
              {filteredEntities.map((entity, idx) => {
                const totalKpis = entity.instances.reduce((sum, inst) => sum + getKpisArray(inst.thinkserver).length, 0);
                const colors = ['green', 'cyan', 'magenta', 'yellow'];
                const color = colors[idx % colors.length];

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedEntity(idx)}
                    className={`border-2 p-3 text-left transition-all ${
                      color === 'green' ? 'border-green-400' :
                      color === 'cyan' ? 'border-cyan-400' :
                      color === 'magenta' ? 'border-magenta-400' :
                      'border-yellow-400'
                    } glow-${color} bg-black hover:bg-${color}-950 hover:bg-opacity-20 relative`}
                  >
                    <div className={`absolute top-2 right-2 w-3 h-3 rounded-full blink ${
                      color === 'green' ? 'bg-green-400' :
                      color === 'cyan' ? 'bg-cyan-400' :
                      color === 'magenta' ? 'bg-magenta-400' :
                      'bg-yellow-400'
                    }`}></div>

                    <div className={`text-xs mb-1 ${
                      color === 'green' ? 'text-green-600' :
                      color === 'cyan' ? 'text-cyan-600' :
                      color === 'magenta' ? 'text-magenta-600' :
                      'text-yellow-600'
                    }`}>[{String(idx + 1).padStart(2, '0')}]</div>

                    <div className={`text-xl font-bold leading-tight mb-2 ${
                      color === 'green' ? 'text-green-400' :
                      color === 'cyan' ? 'text-cyan-400' :
                      color === 'magenta' ? 'text-magenta-400' :
                      'text-yellow-400'
                    }`}>
                      {entity.name}
                    </div>

                    <div className="flex gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">INST:</span>
                        <span className="text-green-300 ml-1 font-bold text-base">{entity.instances.length}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">KPI:</span>
                        <span className={`ml-1 font-bold text-base ${totalKpis > 0 ? 'text-yellow-300' : 'text-gray-700'}`}>{totalKpis}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {filteredEntities.length === 0 && (
              <div className="border-2 border-red-500 p-4 text-center bg-black">
                <AlertTriangle className="mx-auto mb-2 animate-pulse text-red-500" size={32} />
                <div className="text-sm text-red-400">[ERROR: SIN_RESULTADOS]</div>
              </div>
            )}

            {/* Footer */}
            <div className="border-2 border-cyan-400 p-2 text-sm glow-cyan bg-black">
              <div className="flex items-center justify-between">
                <div className="text-cyan-400">
                  <span className="text-yellow-400 blink text-lg">█</span> ONLINE | VIS: <span className="text-cyan-400 font-bold text-base">{filteredEntities.length}/{entities.length}</span>
                </div>
                <div className="text-cyan-600 font-bold">ROOT_ACCESS</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Transacciones */}
      {selectedEntityData && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center p-2 z-50" onClick={() => setSelectedEntity(null)}>
          <div className="w-full max-w-6xl max-h-[98vh] overflow-y-auto border-4 border-cyan-400 glow-cyan bg-black p-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2 border-b border-cyan-400 pb-2">
              <div className="flex-1">
                <div className="text-[10px] text-cyan-600">[DETALLES]</div>
                <h2 className="text-xl font-bold text-cyan-400">{selectedEntityData.name}</h2>
              </div>
              <button onClick={() => setSelectedEntity(null)} className="border border-red-500 p-1">
                <X className="text-red-500" size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {selectedEntityData.instances.map((inst, instIdx) => {
                const kpis = getKpisArray(inst.thinkserver);
                
                return (
                  <div key={instIdx} className="border border-green-400 p-2 bg-black">
                    <div className="flex items-center justify-between mb-2 pb-1 border-b border-green-700">
                      <span className="text-[10px] text-green-600">CONFIG_{instIdx + 1}</span>
                      {inst.tipo && (
                        <span className={`px-2 py-0.5 border text-[10px] font-bold ${
                          inst.tipo === 'EMISIÓN' ? 'border-cyan-400 text-cyan-400' :
                          inst.tipo === 'ADQUIRENCIA' ? 'border-magenta-400 text-magenta-400' :
                          'border-yellow-400 text-yellow-400'
                        }`}>
                          {inst.tipo === 'EMISIÓN' && <Upload className="inline" size={10} />}
                          {inst.tipo === 'ADQUIRENCIA' && <Download className="inline" size={10} />}
                          {inst.tipo}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {inst.red && (
                        <div className="border-2 border-magenta-700 p-2 bg-magenta-950 bg-opacity-20">
                          <div className="text-magenta-600 text-lg font-bold mb-1">RED</div>
                          <div className="text-magenta-400 font-bold text-xl">{inst.red}</div>
                        </div>
                      )}
                      {inst.subred && (
                        <div className="border-2 border-yellow-700 p-2 bg-yellow-950 bg-opacity-20">
                          <div className="text-yellow-600 text-lg font-bold mb-1">SUBRED</div>
                          <div className="text-yellow-400 font-bold text-xl">{inst.subred}</div>
                        </div>
                      )}
                      {inst.entidad && (
                        <div className="border-2 border-cyan-700 p-2 bg-cyan-950 bg-opacity-20">
                          <div className="text-cyan-600 text-lg font-bold mb-1">ENTIDAD</div>
                          <div className="text-cyan-400 font-bold text-xl">{inst.entidad}</div>
                        </div>
                      )}
                      {inst.marca && inst.marca !== '-' && (
                        <div className="border-2 border-green-700 p-2 bg-green-950 bg-opacity-20">
                          <div className="text-green-600 text-lg font-bold mb-1">MARCA</div>
                          <div className="text-green-400 font-bold text-xl">{inst.marca}</div>
                        </div>
                      )}
                      {inst.tipoVia && (
                        <div className="border-2 border-cyan-700 p-2 bg-cyan-950 bg-opacity-20">
                          <div className="text-cyan-600 text-lg font-bold mb-1">TIPO DE VÍA</div>
                          <div className="text-cyan-400 font-bold text-xl">{inst.tipoVia}</div>
                        </div>
                      )}
                      {inst.centroResolutor && (
                        <div className="border-2 border-magenta-700 p-2 bg-magenta-950 bg-opacity-20">
                          <div className="text-magenta-600 text-lg font-bold mb-1">CENTRO RESOLUTOR</div>
                          <div className="text-magenta-400 font-bold text-lg">{inst.centroResolutor}</div>
                        </div>
                      )}
                    </div>

                    {kpis.length > 0 && (
                      <div className="border border-yellow-400 p-1 bg-yellow-950 bg-opacity-20 mb-2">
                        <div className="flex items-center gap-1 mb-1">
                          <AlertTriangle size={10} className="text-yellow-400" />
                          <span className="text-[10px] font-bold text-yellow-400">KPI [{kpis.length}]</span>
                        </div>
                        <div className="space-y-0.5">
                          {kpis.map((kpi, kpiIdx) => (
                            <div key={kpiIdx} className="text-[9px] text-yellow-300 flex gap-1">
                              <span className="text-yellow-600">▸</span>
                              <span className="flex-1">{kpi}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="border border-green-700 p-1 bg-green-950 bg-opacity-20">
                      <div className="text-[9px] text-green-600 mb-0.5">DESC:</div>
                      <div className="text-[10px] text-green-300 leading-tight">{inst.descripcion}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-2 pt-2 border-t border-cyan-400 text-center">
              <button
                onClick={() => setSelectedEntity(null)}
                className="border border-cyan-400 px-4 py-1 text-cyan-400 text-xs font-bold hover:bg-cyan-950 hover:bg-opacity-30"
              >
                [CERRAR]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemManagement;
