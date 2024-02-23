import { motion } from "framer-motion"


const CONTAINER = {
    hidden: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: {
            delayChildren: 0.5,
            staggerChildren: 0.15,
        }
    },
}

const ITEM = {
    hidden: {
        opacity: 0,
        transform: "translateY(20px)",
    },
    show: {
        opacity: 1,
        transform: "translateY(0)",
        transition: {
            duration: 0.6,
            ease: "backOut",
        },
    }
}

export function MotionDiv({ children, ...rest })
{
    const CONTAINER = {
        hidden: {
            opacity: 0,
        },
        show: {
            opacity: 1,
            transition: {
                delayChildren: 0.5,
                staggerChildren: 0.1,
            }
        },
    }

    return (
        <motion.div
            variants={CONTAINER}
            initial="hidden"
            animate="show"

            {...rest}

        >
            {children}
        </motion.div>
    )
}

export function MotionViewport({ children, ...rest })
{

    return (
        <motion.div
            variants={CONTAINER}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}

            // initial={{
            //     opacity: 0,
            //     transform: "translateY(50px)"
            // }}
            // whileInView={{
            //     opacity: 1,
            //     transform: "translateY(0)"
            // }}
            // transition={{
            //     duration: 2,
            //     //delay: 0.5,
            // }}

            {...rest}

        >
            { children }
        </motion.div>
    )
}

export function MotionModel({ children, ...rest }) {
    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}

            {...rest}

        >
            {children}
        </motion.div>
    )
}


export function MotionModelContent({ children, ...rest })
{
    const CONTAINER = {
        hidden: {
            opacity: 0,
            transform: "translateY(20px) scale(0.9)",
        },
        show: {
            opacity: 1,
            transform: "translateY(0) scale(1)",
            transition: {
                ease: "backOut",
                delayChildren: 0.5,
                staggerChildren: 0.15,
            }
        },
        exit: {
            opacity: 0,
            transform: "translateY(20px) scale(0.9)",
            transition: {
                ease: "backIn",
            }
        }
    }

    return (
        <motion.div
            variants={CONTAINER}
            initial="hidden"
            animate="show"
            exit="exit"

            {...rest}

        >
            {children}
        </motion.div>
    )
}

export function MotionItem({ children, ...rest })
{
    return (
        <motion.div variants={ITEM} {...rest} >
            { children }
        </motion.div>
    )
}
