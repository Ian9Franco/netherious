'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface NoiseBackgroundProps {
    children: React.ReactNode;
    containerClassName?: string;
    gradientColors?: string[];
    noiseOpacity?: number;
}

export const NoiseBackground = ({
    children,
    containerClassName,
}: NoiseBackgroundProps) => {
    return (
        <div className={cn('relative inline-block overflow-visible', containerClassName)}>
            <div className="relative z-10">{children}</div>
        </div>
    );
};
