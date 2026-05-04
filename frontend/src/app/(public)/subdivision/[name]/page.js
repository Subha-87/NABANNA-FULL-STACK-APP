"use client";
import { useParams } from "next/navigation";
import LoginPageSubDivision from "../LoginPageSubDivision";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

export default function SubdivisionPage() {
  const { name } = useParams(); // nabanna, writers, alipore etc

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.4 }}
        className="flex flex-1 flex-col h-100 w-100 "
      >
        <LoginPageSubDivision subdivision={name} />
      </motion.div>
    </AnimatePresence>
  );
}
