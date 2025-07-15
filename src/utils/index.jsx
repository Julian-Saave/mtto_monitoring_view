import { useSnackbar } from 'notistack'


export const message = (mensaje, variante) => { 
    const { enqueueSnackbar } = useSnackbar();

    enqueueSnackbar(mensaje, { variant: variante, autoHideDuration: 2000 }); 

};

