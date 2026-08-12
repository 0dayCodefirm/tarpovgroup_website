import { motion, type Variants } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
    },
  },
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      className={centered ? 'text-center' : ''}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {/* Eyebrow */}
      <motion.p variants={itemVariants} className="eyebrow mb-3">
        {eyebrow}
      </motion.p>

      {/* Title */}
      <motion.h2
        variants={itemVariants}
        className={`section-heading text-3xl sm:text-4xl lg:text-5xl mb-4 ${
          centered ? 'mx-auto max-w-3xl' : 'max-w-2xl'
        }`}
      >
        {title}
      </motion.h2>

      {/* Optional subtitle */}
      {subtitle && (
        <motion.p
          variants={itemVariants}
          className={`text-ink-muted text-base sm:text-lg leading-relaxed ${
            centered ? 'mx-auto max-w-2xl' : 'max-w-xl'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
