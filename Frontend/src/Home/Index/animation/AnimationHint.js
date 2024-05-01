import React, { useState, useEffect, useContext } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { CategoryContext } from '../CategoryContext'


function AnimationHint() {
    const { textdata } = useContext(CategoryContext)

    // 透明度
    const [opacity, setOpacity] = useState(0);
    useEffect(() => {
        // 淡入
        const fadeIn = setTimeout(() => {
            setOpacity(1);
        }, 10); // 在组件加载后立即开始淡入

        // 1秒後淡出
        const fadeOut = setTimeout(() => {
            setOpacity(0);
        }, 2000);

        return () => {
            clearTimeout(fadeIn);
            clearTimeout(fadeOut);

        };

    }, []);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        bgcolor: '#fafafa',
        p: 4,
        textAlign: 'center',
        borderRadius: '5px',
        opacity: opacity, //透明度
        transition: 'opacity 3s ease'//動畫
    }
    return (
        <>
                <Paper sx={style}>
                    <Typography >{textdata}</Typography>
                </Paper>
        </>
    )
}

export default AnimationHint