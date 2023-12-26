import { useEffect, useState } from 'react';
import { Admin, Tutorial, Simulation } from '../Types/types';
import { getAdmins, getSimulations, getTutorials } from '../ApiCalls/apiCalls';


export const useFetch = (token:string) => {
  const [simulationsData, setSimulationsData] = useState<{ id: string; name:string}[]>([]);
  const [tutorialsData, setTutorialsData] = useState<{ id: string; tutorname: string; }[]>([]);
  const [adminData, setAdminData] = useState<{ id: string; username: string; }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [simulations, tutorials, admins] = await Promise.all([
          getSimulations(token),
          getTutorials(token),
          getAdmins(token),
        ]);

        if (simulations) {
          const simulationDataFormatted = Object.values(simulations).map((simulation: Simulation) => ({
            id: simulation._id,
            name:simulation.simulationName
          }));
          setSimulationsData(simulationDataFormatted);
        } else {
          console.error('Simulation data is undefined');
        }

        if (tutorials) {
          const tutorialsDataFormatted = Object.values(tutorials).map((tutorial: Tutorial) => ({
            id: tutorial._id,
            tutorname: tutorial.tutorialName,
          }));
          setTutorialsData(tutorialsDataFormatted);
        } else {
          console.error('Tutorials data is undefined');
        }


        if (admins) {
          const adminDataFormatted = Object.values(admins).map((admin: Admin) => ({
            id: admin._id,
            username: admin.username,
          }));
          setAdminData(adminDataFormatted);
        } else {
          console.error('Admin data is undefined');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return { simulationsData, tutorialsData, adminData };
};
