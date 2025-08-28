import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { RadioGroup } from 'src/ui/radio-group';

type ArticleParamsFormProps = {
	currentState: ArticleStateType;
	setCurrentState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentState,
	setCurrentState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(currentState);
	const rootRef = useRef<HTMLDivElement>(null);

	const handleToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleFormChange = (key: keyof ArticleStateType, value: OptionType) => {
		setFormState({ ...formState, [key]: value });
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onClose: () => setIsMenuOpen(false),
		onChange: setIsMenuOpen,
	});

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setCurrentState(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setCurrentState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleToggle} />
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={formState.fontFamilyOption}
						onChange={(option) => handleFormChange('fontFamilyOption', option)}
						options={fontFamilyOptions}
						title='шрифт'
					/>

					<RadioGroup
						selected={formState.fontSizeOption}
						name='radio'
						onChange={(option) => handleFormChange('fontSizeOption', option)}
						options={fontSizeOptions}
						title='рАЗМЕР шрифта'
					/>

					<Select
						selected={formState.fontColor}
						onChange={(option) => handleFormChange('fontColor', option)}
						options={fontColors}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={formState.backgroundColor}
						onChange={(option) => handleFormChange('backgroundColor', option)}
						options={backgroundColors}
						title='Цвет фона'
					/>

					<Select
						selected={formState.contentWidth}
						onChange={(option) => handleFormChange('contentWidth', option)}
						options={contentWidthArr}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
