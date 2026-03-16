// Framer Component — AnimatedButton
// Corsica Studio · corsica-studio.com

import { addPropertyControls, ControlType } from "framer"
import { motion } from "framer-motion"

interface Props {
    label: string
    backgroundColor: string
    textColor: string
    borderRadius: number
    fontSize: number
    paddingX: number
    paddingY: number
    hoverScale: number
    onClick?: () => void
}

export default function AnimatedButton({
    label = "Découvrir",
    backgroundColor = "#FF6E44",
    textColor = "#ffffff",
    borderRadius = 8,
    fontSize = 16,
    paddingX = 32,
    paddingY = 14,
    hoverScale = 1.04,
    onClick,
}: Props) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: hoverScale }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{
                backgroundColor,
                color: textColor,
                borderRadius,
                fontSize,
                paddingLeft: paddingX,
                paddingRight: paddingX,
                paddingTop: paddingY,
                paddingBottom: paddingY,
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontFamily: "inherit",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                outline: "none",
                letterSpacing: "-0.01em",
            }}
        >
            {label}
        </motion.button>
    )
}

addPropertyControls(AnimatedButton, {
    label: { type: ControlType.String, title: "Label", defaultValue: "Découvrir" },
    backgroundColor: { type: ControlType.Color, title: "Fond", defaultValue: "#FF6E44" },
    textColor: { type: ControlType.Color, title: "Texte", defaultValue: "#ffffff" },
    borderRadius: { type: ControlType.Number, title: "Radius", defaultValue: 8, min: 0, max: 100 },
    fontSize: { type: ControlType.Number, title: "Font size", defaultValue: 16, min: 12, max: 32 },
    paddingX: { type: ControlType.Number, title: "Padding X", defaultValue: 32, min: 8, max: 80 },
    paddingY: { type: ControlType.Number, title: "Padding Y", defaultValue: 14, min: 4, max: 40 },
    hoverScale: { type: ControlType.Number, title: "Hover scale", defaultValue: 1.04, min: 1, max: 1.2, step: 0.01 },
})
