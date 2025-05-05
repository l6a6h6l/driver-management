import React, { useState } from 'react';
import { Search, Database, Server, X, Activity, ChevronDown, ChevronUp, Cloud, Layers, Settings, Grid, BarChart, ListFilter } from 'lucide-react';

const DriverManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDriver, setExpandedDriver] = useState(null);
  const [activeTab, setActiveTab] = useState('cao');

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
    { id: 11, name: 'DCI', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '3083', subDrivers: [{ trabajos: 'DCI' }, { trabajos: 'DCI800' }], icon: <Server /> },
    { id: 12, name: 'DCI2', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '3083', subDrivers: [{ trabajos: 'DC2' }, { trabajos: 'DC2800' }], icon: <Server /> },
    { id: 13, name: 'MCI', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '6083', subDrivers: [{ trabajos: 'MASTER' }, { trabajos: 'MASTER800' }], icon: <Database /> },
    { id: 14, name: 'MDS', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '6086', subDrivers: [{ trabajos: 'CAOMDS' }, { trabajos: 'CAOMDS800' }], icon: <Database /> },
    { id: 15, name: 'BANRED', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '2015', subDrivers: [{ trabajos: 'BANRED' }, { trabajos: 'BANRED800' }], icon: <Layers /> },
    { id: 16, name: 'BANRED-B24', subsistema: 'CASBS', puertoLocal: '7793', puertoRemoto: '----', subDrivers: [{ trabajos: 'CAOB24' }, { trabajos: 'CAOB24800' }], icon: <Layers /> },
    { id: 17, name: 'BANRED-B25', subsistema: 'CASBS', puertoLocal: '7795', puertoRemoto: '----', subDrivers: [{ trabajos: 'CAOB25' }, { trabajos: 'CAOB25800' }], icon: <Layers /> },
    { id: 18, name: 'BANCO PICHINCHA (EFECTIVO EXPRESS)', subsistema: 'CASBS', puertoLocal: '7715', puertoRemoto: '----', ip: '192.168.77.113', subDrivers: [{ trabajos: 'CAOPICH' }, { trabajos: 'CAOPICH800' }], icon: <Grid /> },
    { id: 19, name: 'PULSE', subsistema: 'CASBS', puertoLocal: '4198', puertoRemoto: '----', ip: '199.38.157.104', subDrivers: [{ trabajos: 'CAOPUL' }, { trabajos: 'CAOPUL800' }], icon: <Activity /> },
    { id: 20, name: 'ATM DINERS', subsistema: 'CASBS', puertoLocal: '8109', puertoRemoto: '----', ip: '10.100.176.223', subDrivers: [{ trabajos: 'DATBRK' }, { trabajos: 'DATBRK800' }], icon: <Grid /> },
    { id: 21, name: 'BROKER (TRANSFERENCIAS INTERBANCARIAS)', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '9001', ip: '10.100.176.223', subDrivers: [{ trabajos: 'CAOBRO' }, { trabajos: 'CAOBRO800' }], icon: <Grid /> },
    { id: 22, name: 'DOCK', subsistema: 'BANREDSBS', puertoLocal: '----', puertoRemoto: '10185', ip: '10.19.225.10', subDrivers: [{ trabajos: 'CAODCK' }, { trabajos: 'CAODCK800' }], icon: <Layers /> },
    { id: 23, name: 'MÓDULO GRÁFICO', subsistema: 'QINTER', puertoLocal: '52000', puertoRemoto: '----', ip: '----', subDrivers: [{ trabajos: 'LISTEN2550' }, { trabajos: 'LISTEN721' }], icon: <BarChart /> },
    { id: 24, name: 'TRABAJO DE DEPURACIÓN', subsistema: 'CASBS', puertoLocal: '----', puertoRemoto: '----', ip: 'Op. DEPURCION ARCHIVOS TEMPORALES', subDrivers: [{ trabajos: 'CAODEPURA' }], icon: <Settings /> },
    { id: 25, name: 'BPC-BP', subsistema: 'CASBS', puertoLocal: '7723', puertoRemoto: '----', ip: '10.14.64.11 o 10.14.64.12', subDrivers: [{ trabajos: 'CAOBPC' }, { trabajos: 'CAOBPC800' }], icon: <Settings /> },
    { id: 26, name: 'JARDIN AZUAYO', subsistema: 'CASBS', puertoLocal: '7765', puertoRemoto: '----', ip: '10.100.2.21', subDrivers: [{ trabajos: 'CAOJAR' }, { trabajos: 'CAOJAR800' }], icon: <Grid /> }
  ];

  // Datos de los drivers del Gestor
  const driversGestor = [
    { id: 101, name: 'OFICIAL', subsistema: 'ASEB10SBS', puertoLocal: '7704', puertoRemoto: '----', ip: '10.100.2.21', icon: <Settings />, subDrivers: [
      { trabajos: 'ASGOFIADM' },
      { trabajos: 'ASGOFIADM2' },
      { trabajos: 'CAOFIASG' }
    ]},
    { id: 102, name: 'ONLINE COLAS', subsistema: 'ASEB10SBS', puertoLocal: '7706', puertoRemoto: '----', ip: '10.100.2.21', icon: <Cloud />, subDrivers: [
      { trabajos: 'ASGONLCOLA' },
      { trabajos: 'ASGONLSE1' },
      { trabajos: 'ASGONLSE2' },
      { trabajos: 'ASGONLSE3' }
    ]},
    { id: 103, name: 'RECARGA', subsistema: 'ASEB10SBS', puertoLocal: '7716', puertoRemoto: '----', ip: '10.100.2.21', icon: <Activity />, subDrivers: [
      { trabajos: 'ASGONLIREC' },
      { trabajos: 'SMSANULAUT' }
    ]},
    { id: 104, name: 'ONLINE MASIVO', subsistema: 'ASEB10SBS', puertoLocal: '7709', puertoRemoto: '----', ip: '10.100.2.21', icon: <Grid />, subDrivers: [
      { trabajos: 'CAOONLINEMX' }
    ]},
    { id: 105, name: 'TRANSACCIONAL', subsistema: 'ASEB10SBS', puertoLocal: '7900', puertoRemoto: '----', ip: '10.100.2.21', icon: <BarChart />, subDrivers: [
      { trabajos: 'DATGESR1' },
      { trabajos: 'DATGESATRX' }
    ]},
    { id: 106, name: 'DRIVER SEGURIDAD', subsistema: 'ASEB10SBS', puertoLocal: '7000', puertoRemoto: '----', ip: '10.13.20.10', icon: <Settings />, subDrivers: [
      { trabajos: 'MNTATALLA' },
      { trabajos: 'NSPATALLA' }
    ]},
    { id: 107, name: 'MUNICIPIO DE GUAYAQUIL', subsistema: 'ASEB10SBS', puertoLocal: '2513', puertoRemoto: '----', ip: '172.20.20.200', icon: <Grid />, subDrivers: [
      { trabajos: 'GESBAN' },
      { trabajos: 'GESBANSE1' }
    ]},
    { id: 108, name: 'DATACREDITO', subsistema: 'ASEB10SBS', puertoLocal: '8600', puertoRemoto: '----', ip: '192.168.29.150', icon: <Database />, subDrivers: [
      { trabajos: 'DATCREDI1' },
      { trabajos: 'DATCREDI2' },
      { trabajos: 'DATCRT01' }
    ]},
    { id: 109, name: 'GESTOR- BROKER (TOKENIZACIÓN)', subsistema: 'ASEB10SBS', puertoLocal: '9001', puertoRemoto: '----', ip: '10.100.176.223', icon: <Activity />, subDrivers: [
      { trabajos: 'BRKRB001' },
      { trabajos: 'BRKRB002' },
      { trabajos: 'BRKRB004' }
    ]},
    { id: 110, name: 'TRIGGER', subsistema: 'ASEB10SBS', puertoLocal: '----', puertoRemoto: '----', ip: '----', icon: <Activity />, subDrivers: [
      { trabajos: 'TRCVGESDTA' },
      { trabajos: 'TSNDGESDTA' }
    ]},
    { id: 111, name: 'WRKJOBSCDE', subsistema: 'QINTER', puertoLocal: '----', puertoRemoto: '52000/60001/53000/51000/62000/63000/64000', ip: '----', icon: <BarChart />, subDrivers: [
      { trabajos: 'LISTEN2' },
      { trabajos: 'LISTEN610' },
      { trabajos: 'PLEXLISOND' },
      { trabajos: 'PLEXLISTEN' },
      { trabajos: 'PLEXLIS610' },
      { trabajos: 'PLEXLIS72A' },
      { trabajos: 'PLEXLIS72B' }
    ]},
    { id: 112, name: 'SMSLISTEN', subsistema: 'QSMSSBS', puertoLocal: '----', puertoRemoto: '24001', ip: '----', icon: <Activity />},
    { id: 113, name: 'CIERRE DE OPERACIONES', subsistema: 'ASEB10SBS', puertoLocal: '----', puertoRemoto: '----', ip: '10.100.2.4', icon: <Database />, subDrivers: [
      { trabajos: 'ASGCIEADM' },
      { trabajos: '(5 TRABAJOS' }
    ]},
    { id: 114, name: 'IMPRESIÓN TARJETAS DE DEBITO DOCK', subsistema: 'ASEB10SBS', puertoLocal: '----', puertoRemoto: '----', ip: '10.100.2.4', icon: <Grid />, subDrivers: [
      { trabajos: 'DTARB001' }
    ]}
  ];

  // Obtener el conjunto de drivers activo según la pestaña seleccionada
  const activeDrivers = activeTab === 'cao' ? driversCao : driversGestor;

  // Filtrado de drivers
  const filteredDrivers = activeDrivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle driver
  const toggleDriver = (driverId) => {
    setExpandedDriver(expandedDriver === driverId ? null : driverId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con degradado mejorado */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold flex items-center">
            <Server className="mr-2 h-7 w-7" />
            Gestión de Drivers
          </h1>
          <p className="text-blue-100 text-sm">Sistema de administración de drivers CAO y Gestor</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto p-4">
        {/* Pestañas y Búsqueda */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            {/* Pestañas */}
            <div className="flex space-x-1 mb-4 sm:mb-0">
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
                </div>
              </button>
            </div>
            
            {/* Búsqueda */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
              <input
                type="text"
                placeholder={`Buscar driver ${activeTab === 'cao' ? 'CAO' : 'Gestor'}...`}
                className="w-full pl-9 pr-4 py-2 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm
