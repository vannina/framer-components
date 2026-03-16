// Framer Component — MarqueeText
// Corsica Studio · corsica-studio.com

import { addPropertyControls, ControlType } from "framer"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface Props {
    items: string[]
    separator: string
    speed: number
    direction: "left" | "right"
    fontSize: number
    textColor: string
    backgroundColor: string
    fontWeight: number
    gap: number
    pauseOnHover: boolean
}

export default function MarqueeText({
    items = ["Automatisation IA", "Sites Framer", "Workflows n8n", "Intégration Claude"],
    separator = "·",
    speed = 40,
    direction = "left",
    fontSize = 18,
    textColor = "#ffffff",
    backgroundColor = "transparent",
    fontWeight = 500,
    gap = 48,
    pauseOnHover = true,
}: Props) {
    const [paused, setPaused] = useState(false)
    const trackRef = useRef<HTMLDivElement>(null)
    const [trackWidth, setTrackWidth] = useState(0)

    const content = items.flatMap((item) => [item, separator])
    const repeated = [...content, ...content]

    useEffect(() => {
        if (trackRef.current) {
            setTrackWidth(trackRef.current.scrollWidth / 2)
        }
    }, [items, fontSize, gap])

    const duration = trackWidth / speed

    return (
        <div
            style={{
                overflow: "hidden",
                backgroundColor,
                width: "100%",
                display: "flex",
                alignItems: "center",
            }}
            onMouseEnter={() => pauseOnHover && setPaused(true)}
            onMouseLeave={() => pauseOnHover && setPaused(false)}
        >
            <motion.div
                ref={trackRef}
                animate={{ x: direction === "left" ? [-trackWidth, 0] : [0, -trackWidth] }}
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: "linear",
                    ...(paused ? { playState: "paused" } : {}),
                }}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap,
                    whiteSpace: "nowrap",
                    animationPlayState: paused ? "paused" : "running",
                }}
            >
                {repeated.map((text, i) => (
                    <span
                        key={i}
                        style={{
                            fontSize,
                            color: textColor,
                            fontWeight,
                            opacity: text === separator ? 0.4 : 1,
                            fontFamily: "inherit",
                        }}
                    >
                        {text}
                    </span>
                ))}
            </motion.div>
        </div>
    )
}

addPropertyControls(MarqueeText, {
    items: {
        type: ControlType.Array,
        title: "Éléments",
        control: { type: ControlType.String },
        defaultValue: ["Automatisation IA", "Sites Framer", "Workflows n8n", "Intégration Claude"],
    },
    separator: { type: ControlType.String, title: "Séparateur", defaultValue: "·" },
    speed: { type: ControlType.Number, title: "Vitesse (px/s)", defaultValue: 40, min: 10, max: 300 },
    direction: {
        type: ControlType.Enum,
        title: "Direction",
        options: ["left", "right"],
        optionTitles: ["Gauche", "Droite"],
        defaultValue: "left",
    },
    fontSize: { type: ControlType.Number, title: "Font size", defaultValue: 18, min: 10, max: 80 },
    textColor: { type: ControlType.Color, title: "Couleur texte", defaultValue: "#ffffff" },
    backgroundColor: { type: ControlType.Color, title: "Fond", defaultValue: "transparent" },
    fontWeight: { type: ControlType.Number, title: "Font weight", defaultValue: 500, min: 100, max: 900, step: 100 },
    gap: { type: ControlType.Number, title: "Espacement", defaultValue: 48, min: 8, max: 200 },
    pauseOnHover: { type: ControlType.Boolean, title: "Pause au survol", defaultValue: true },
})
