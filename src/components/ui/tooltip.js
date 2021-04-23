import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

export const LightTooltip = withStyles((theme) => ({
  arrow: {
    fontSize: 12,
    color: "#3d3d5c",
    "&::before": {
      backgroundColor: "#3d3d5c",
    },
  },
  tooltip: {
    backgroundColor: "#3d3d5c",
    color: "#e0e0eb",
    boxShadow: theme.shadows[1],
    fontSize: "0.8rem",
    padding: "0.5rem",
    textAlign: "center",
  },
}))(Tooltip);
