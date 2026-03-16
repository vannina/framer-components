// Framer Component — ScrollReveal
// Corsica Studio · corsica-studio.com

import { addPropertyControls, ControlType } from "framer"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface Props {
    children?: React.ReactNode
    direction: "up" | "down" | "left" | "right" | "fade"
    distance: number
    duration: number
    delay: number
    once: boolean
    width: number | string
    height: number | string
}

const directionMap = {
    up:    { y: (d: number) => d, x: 0 },
    down:  { y: (d: number) => -d, x: 0 },
    left:  { y: 0, x: (d: number) => d },
    right: { y: 0, x: (d: number) => -d },
    fade:  { y: 0, x: 0 },
}

export default function ScrollReveal({
    children,
    direction = "up",
    distance = 40,
    duration = 0.6,
    delay = 0,
    once = true,
    width = "100%",
    height = "auto",
}: Props) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once, margin: "-60px" })

    const dir = directionMap[direction]
    const yVal = typeof dir.y === "function" ? dir.y(distance) : dir.y
    const xVal = typeof dir.x === "function" ? dir.x(distance) : dir.x

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: yVal, x: xVal }}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: yVal, x: xVal }}
            transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
            style={{ width, height }}
        >
            {children}
        </motion.div>
    )
}

addPropertyControls(ScrollReveal, {
    direction: {
        type: ControlType.Enum,
        title: "Direction",
        options: ["up", "down", "left", "right", "fade"],
        optionTitles: ["Haut", "Bas", "Gauche", "Droite", "Fondu"],
        defaultValue: "up",
    },
    distance: { type: ControlType.Number, title: "Distance (px)", defaultValue: 40, min: 0, max: 200 },
    duration: { type: ControlType.Number, title: "Durée (s)", defaultValue: 0.6, min: 0.1, max: 2, step: 0.05 },
    delay: { type: ControlType.Number, title: "Délai (s)", defaultValue: 0, min: 0, max: 2, step: 0.05 },
    once: { type: ControlType.Boolean, title: "Une seule fois", defaultValue: true },
})
