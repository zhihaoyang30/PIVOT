# 来源与校对

正文依据本项目最新 ICLR 稿件生成的 `../2026_Arxiv`，未使用旧 ARR 稿件。作者顺序和单位采用作者确认的最新名单；公开核验记录见 `../2026_Arxiv/AUTHOR_AFFILIATIONS.md`。

## 叙事主线

教师指导需要同时支持成功轨迹的可达性，以及学生对教师决策的学习。先解释两类信号的不足，再介绍 PIVOT 如何组合它们；随后用干预时机、监督方向和预算消融支撑配方，最后呈现学生自身的评测结果与适用边界。

## 图表映射

| 网页图文件 | 原稿文件 | 原稿编号 |
| --- | --- | --- |
| prefix-supervision.svg | figures/figure3.pdf | Fig. 2 |
| recovery.svg | figures/fig_bimodal_schematic.pdf | Fig. 3 |
| overview.svg | figures/figure1.pdf | Fig. 1 |
| student-context.svg | figures/middle_context_ablation.pdf | Fig. 4 |
| kl-objective.svg | figures/kl_comp_v2_half_width.pdf | Fig. 6 |
| calibration.svg | figures/calibration.pdf | Fig. 7 |

SVG 由原稿 PDF 通过 `pdftocairo -svg` 导出，保留原有图形与配色。正文表格根据论文主文 Table 2 转录，案例表来自 Appendix C。

## 数据口径

- 主结果：56 个原始数值逐项核对；逻辑游戏页新增的 8 个均值为三种游戏的算术平均，保留一位小数。
- 逻辑游戏、Math-ID、MATH500 使用 avg@8；AIME 2024/2025 使用 avg@64。所有结果以百分数表示。
- 19.5 → 35.6 为 mean avg@8，比较 KDRL 与反向 KL 的 PIVOT；差值约 16.1 个百分点，约 1.82 倍。
- 干预位置与开头来源实验使用正向 KL；不可将其 19.25 与主结果反向 KL 的 25.44 当作同一配置。
- 独立的 oracle-prefix 控制实验未与干预位置实验混合。
- 案例表的 12 个数值保持原稿；更大后续预算下的 4/4 仅对应教师。案例不单独识别某个因素的因果作用。
- KL 的模式覆盖解释保留为与实验相符的可能解释；未表述为直接测得的结论。

论文 PDF 与网页资源均保存在本文件夹内，未发布到外部站点。
