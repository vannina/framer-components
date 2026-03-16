// Framer Component — GradientCard
// Corsica Studio · corsica-studio.com

import { addPropertyControls, ControlType } from "framer"
import { motion } from "framer-motion"
import { useState } from "react"

interface Props {
    title: string
    description: string
    tag: string
    gradientFrom: string
    gradientTo: string
    gradientAngle: number
    textColor: string
    tagColor: string
    borderRadius: number
    padding: number
    width: number | string
    height: number | string
    animateOnHover: boolean
}

export default function GradientCard({
    title = "Automatisation IA",
    description = "Connectez vos outils et automatisez vos processus métier avec des workflows intelligents.",
    tag = "n8n",
    gradientFrom = "#2B4150",
    gradientTo = "#51738C",
    gradientAngle = 135,
    textColor = "#ffffff",
    tagColor = "#FF6E44",
    borderRadius = 16,
    padding = 32,
    width = 360,
    height = "auto",
    animateOnHover = true,
}: Props) {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            onHoverStart={() => animateOnHover && setHovered(true)}
            onHoverEnd={() => animateOnHover && setHovered(false)}
            animate={{
                y: hovered ? -6 : 0,
                boxShadow: hovered
                    ? "0 24px 48px rgba(0,0,0,0.3)"
                    : "0 4px 16px rgba(0,0,0,0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            style={{
                width,
                height,
                background: `linear-gradient(${gradientAngle}deg, ${gradientFrom}, ${gradientTo})`,
                borderRadius,
                padding,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxSizing: "border-box",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Noise texture overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
                    opacity: 0.6,
                    pointerEvents: "none",
                    borderRadius,
                }}
            />

            {tag && (
                <span
                    style={{
                        display: "inline-block",
                        backgroundColor: tagColor,
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        padding: "4px 10px",
                        borderRadius: 6,
                        alignSelf: "flex-start",
                        fontFamily: "inherit",
                    }}
                >
                    {tag}
                </span>
            )}

            <h3
                style={{
                    margin: 0,
                    fontSize: 22,
                    fontWeight: 700,
                    color: textColor,
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    fontFamily: "inherit",
                }}
            >
                {title}
            </h3>

            <p
                style={{
                    margin: 0,
                    fontSize: 15,
                    color: textColor,
                    opacity: 0.75,
                    lineHeight: 1.6,
                    fontFamily: "inherit",
                }}
            >
                {description}
            </p>
        </motion.div>
    )
}

addPropertyControls(GradientCard, {
    title: { type: ControlType.String, title: "Titre", defaultValue: "Automatisation IA" },
    description: {
        type: ControlType.String,
        title: "Description",
        defaultValue: "Connectez vos outils et automatisez vos processus métier.",
        displayTextArea: true,
    },
    tag: { type: ControlType.String, title: "Tag", defaultValue: "n8n" },
    gradientFrom: { type: ControlType.Color, title: "Gradient début", defaultValue: "#2B4150" },
    gradientTo: { type: ControlType.Color, title: "Gradient fin", defaultValue: "#51738C" },
    gradientAngle: { type: ControlType.Number, title: "Angle", defaultValue: 135, min: 0, max: 360 },
    textColor: { type: ControlType.Color, title: "Couleur texte", defaultValue: "#ffffff" },
    tagColor: { type: ControlType.Color, title: "Couleur tag", defaultValue: "#FF6E44" },
    borderRadius: { type: ControlType.Number, title: "Radius", defaultValue: 16, min: 0, max: 48 },
    padding: { type: ControlType.Number, title: "Padding", defaultValue: 32, min: 8, max: 80 },
    animateOnHover: { type: ControlType.Boolean, title: "Animer au survol", defaultValue: true },
})
