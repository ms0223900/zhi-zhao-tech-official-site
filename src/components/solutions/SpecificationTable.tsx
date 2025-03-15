import React from 'react';

export interface SpecificationItem {
    label: string;
    value: string | string[];
}

interface SpecificationTableProps {
    specifications: SpecificationItem[];
    title?: string;
    className?: string;
}

export function SpecificationTable({
    specifications,
    title,
    className = ''
}: SpecificationTableProps) {
    return (
        <div className={`overflow-hidden rounded-lg border border-gray-200 ${className}`}>
            {title && (
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {specifications.map((spec, index) => (
                            <tr key={index}>
                                <td className="whitespace-nowrap py-3 px-4 text-sm font-medium text-gray-900 bg-gray-50 w-1/3">
                                    {spec.label}
                                </td>
                                <td className="whitespace-pre-line py-3 px-4 text-sm text-gray-500">
                                    {Array.isArray(spec.value)
                                        ? spec.value.map((item, i) => (
                                            <div key={i} className={i > 0 ? 'mt-2' : ''}>{item}</div>
                                        ))
                                        : spec.value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}