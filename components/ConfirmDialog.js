import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
    dialog: {
        position: 'absolute',
        top: theme.spacing(1)
    }
}))

export default function ConfirmDialog({ confirmDialog, setConfirmDialog }) {

    const classes = useStyles();

    return (
        <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle>
                {confirmDialog?.title}
            </DialogTitle>
            <DialogContent>
                {confirmDialog?.subTitle}
            </DialogContent>
            <DialogActions>
                <Button
                    variant='outlined'
                    onClick={() => {
                        setConfirmDialog(prev => ({
                            ...prev,
                            isOpen: false
                        }))
                    }}
                >
                    No
                </Button>
                <Button
                    variant='contained'
                    onClick={() => confirmDialog.onConfirm()}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}