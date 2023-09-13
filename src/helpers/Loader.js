import { CircularProgress, Stack } from "@mui/material";

export function Loader(){
    return <Stack direction={"row"} alignItems={"center"} sx={{height:"200px"}} justifyContent={"center"}>
            <CircularProgress color="secondary" />
    </Stack>
}